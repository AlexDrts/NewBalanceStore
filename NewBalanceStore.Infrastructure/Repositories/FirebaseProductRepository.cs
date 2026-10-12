using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.Extensions.Configuration;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;
using System.Diagnostics.CodeAnalysis;

namespace NewBalanceStore.Infrastructure.Repositories;

/// <summary>
/// Репозиторій для роботи з колекцією товарів у хмарній базі даних Firebase Realtime Database.
/// Забезпечує виконання мережевих запитів CRUD над JSON-вузлом <c>products</c>.
/// </summary>
[ExcludeFromCodeCoverage]
public class FirebaseProductRepository : IProductRepository
{
    private readonly FirebaseClient _firebaseClient;
    private const string CollectionName = "products";

    /// <summary>
    /// Ініціалізує екземпляр репозиторію з конфігурації, створюючи підключення до Firebase за вказаним URL.
    /// </summary>
    /// <param name="config">Конфігурація застосунку, що містить URL бази даних.</param>
    /// <exception cref="InvalidOperationException">Виникає, якщо параметр Firebase:DatabaseUrl не знайдено в налаштуваннях.</exception>
    public FirebaseProductRepository(Microsoft.Extensions.Configuration.IConfiguration config)
    {
        var databaseUrl = config["Firebase:DatabaseUrl"]
            ?? throw new InvalidOperationException("Firebase:DatabaseUrl не настроено в appsettings.json");

        _firebaseClient = new FirebaseClient(databaseUrl);
    }

    /// <summary>
    /// Отримує всі документи товарів з Firebase Realtime Database та перетворює їх на типізований список.
    /// Безпечно обробляє помилки десеріалізації окремих вузлів, ігноруючи пошкоджені записи.
    /// </summary>
    /// <returns>Список доменних моделей <see cref="Product"/>.</returns>
    public async Task<List<Product>> GetAllAsync()
    {
        var objects = await _firebaseClient
            .Child(CollectionName)
            .OnceAsync<Newtonsoft.Json.Linq.JObject>();

        var productsList = new List<Product>();

        foreach (var item in objects)
        {
            try
            {
                var product = item.Object?.ToObject<Product>();
                if (product != null)
                {
                    if (int.TryParse(item.Key, out int parsedId))
                    {
                        product.Id = parsedId;
                    }
                    productsList.Add(product);
                }
            }
            catch
            {
                continue;
            }
        }

        return productsList;
    }

    /// <summary>
    /// Знаходить товар у Firebase за його ключем вузла.
    /// </summary>
    /// <param name="id">Рядковий ідентифікатор товару.</param>
    /// <returns>Сутність <see cref="Product"/> або <c>null</c>, якщо запис відсутній.</returns>
    public async Task<Product?> GetByIdAsync(string id)
    {
        var product = await _firebaseClient
            .Child($"{CollectionName}/{id}")
            .OnceSingleAsync<Product>();

        if (product != null && int.TryParse(id, out int parsedId))
        {
            product.Id = parsedId;
        }

        return product;
    }

    /// <summary>
    /// Зберігає новий товар у Firebase.
    /// Якщо Id товару не встановлено (або менше або дорівнює 0), генерується псевдоунікальний
    /// числовий ID на основі поточних тактів часу UTC (<c>DateTime.UtcNow.Ticks % int.MaxValue</c>).
    /// </summary>
    /// <param name="item">Товар для додавання.</param>
    public async Task CreateAsync(Product item)
    {
        if (item.Id <= 0)
        {
            // Генерація унікального числового ID на базі тактового таймера
            item.Id = (int)(DateTime.UtcNow.Ticks % int.MaxValue);
        }

        await _firebaseClient
            .Child($"{CollectionName}/{item.Id}")
            .PutAsync(item);
    }

    /// <summary>
    /// Оновлює існуючий документ товару у Firebase за його ключем.
    /// </summary>
    /// <param name="item">Сутність товару з оновленими властивостями.</param>
    public async Task UpdateAsync(Product item)
    {
        await _firebaseClient
            .Child($"{CollectionName}/{item.Id}")
            .PutAsync(item);
    }

    /// <summary>
    /// Видаляє вузол товару з Firebase за його ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару для видалення.</param>
    public async Task DeleteAsync(string id)
    {
        await _firebaseClient
            .Child($"{CollectionName}/{id}")
            .DeleteAsync();
    }
}