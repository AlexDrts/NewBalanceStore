using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.Extensions.Configuration;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces; 

namespace NewBalanceStore.Infrastructure.Repositories;

public class FirebaseProductRepository : IProductRepository
{
    private readonly FirebaseClient _firebaseClient;
    private const string CollectionName = "products";

    public FirebaseProductRepository(Microsoft.Extensions.Configuration.IConfiguration config)
    {
        var databaseUrl = config["Firebase:DatabaseUrl"]
            ?? throw new InvalidOperationException("Firebase:DatabaseUrl не настроено в appsettings.json");

        _firebaseClient = new FirebaseClient(databaseUrl);
    }

    public async Task<List<Product>> GetAllAsync()
    {
        try
        {
            var productsDict = await _firebaseClient
                .Child(CollectionName)
                .OnceSingleAsync<Dictionary<string, Product>>();

            if (productsDict == null) return new List<Product>();

            return productsDict
                .Where(pair => pair.Value != null)
                .Select(pair =>
                {
                    var product = pair.Value;
                    if (string.IsNullOrEmpty(product.Id))
                    {
                        product.Id = pair.Key;
                    }
                    return product;
                }).ToList();
        }
        catch
        {
            var productsList = await _firebaseClient
                .Child(CollectionName)
                .OnceSingleAsync<List<Product>>();

            return productsList?.Where(p => p != null).ToList() ?? new List<Product>();
        }
    }

    public async Task<Product?> GetByIdAsync(string id)
    {
        var product = await _firebaseClient
            .Child($"{CollectionName}/{id}")
            .OnceSingleAsync<Product>();

        if (product != null)
        {
            product.Id = id;
        }

        return product;
    }

    public async Task CreateAsync(Product item)
    {
        if (string.IsNullOrEmpty(item.Id))
        {
            item.Id = Guid.NewGuid().ToString();
        }

        await _firebaseClient
            .Child($"{CollectionName}/{item.Id}")
            .PutAsync(item);
    }

    public async Task UpdateAsync(Product item)
    {
        await _firebaseClient
            .Child($"{CollectionName}/{item.Id}")
            .PutAsync(item);
    }

    public async Task DeleteAsync(string id)
    {
        await _firebaseClient
            .Child($"{CollectionName}/{id}")
            .DeleteAsync();
    }
}