using System.Diagnostics.CodeAnalysis;
using Firebase.Database;
using Firebase.Database.Query;
using Microsoft.Extensions.Configuration;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;
using Newtonsoft.Json.Linq;

namespace NewBalanceStore.Infrastructure.Repositories;

[ExcludeFromCodeCoverage]
public class FirebaseUserRepository : IUserRepository
{
    private readonly FirebaseClient _firebaseClient;
    private const string CollectionName = "users";

    public FirebaseUserRepository(IConfiguration config)
    {
        var databaseUrl = config["Firebase:DatabaseUrl"]
            ?? throw new InvalidOperationException("Firebase:DatabaseUrl не настроено в appsettings.json");

        _firebaseClient = new FirebaseClient(databaseUrl);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        var users = await GetAllAsync();
        return users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
    }

    public async Task CreateAsync(User user)
    {
        if (string.IsNullOrEmpty(user.Id))
        {
            user.Id = Guid.NewGuid().ToString();
        }

        await _firebaseClient
            .Child($"{CollectionName}/{user.Id}")
            .PutAsync(user);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var objects = await _firebaseClient
            .Child(CollectionName)
            .OnceAsync<JObject>();

        var usersList = new List<User>();

        foreach (var item in objects)
        {
            try
            {
                var user = item.Object?.ToObject<User>();
                if (user != null)
                {
                    if (string.IsNullOrEmpty(user.Id))
                    {
                        user.Id = item.Key;
                    }
                    usersList.Add(user);
                }
            }
            catch
            {
                continue;
            }
        }

        return usersList;
    }
}