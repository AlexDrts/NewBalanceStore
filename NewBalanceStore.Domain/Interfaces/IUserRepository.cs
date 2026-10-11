using NewBalanceStore.Domain.Entities;

namespace NewBalanceStore.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task CreateAsync(User user);
    Task<IEnumerable<User>> GetAllAsync();
}