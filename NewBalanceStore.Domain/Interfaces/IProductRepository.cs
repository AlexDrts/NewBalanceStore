using NewBalanceStore.Domain.Entities;

namespace NewBalanceStore.Domain.Interfaces;

/// <summary>
/// Контракт репозиторію для доступу та маніпулювання даними товарів у базі даних.
/// Відповідає за інкапсуляцію операцій CRUD над сутністю <see cref="Product"/>.
/// </summary>
public interface IProductRepository
{
    /// <summary>
    /// Отримує повний список усіх доступних товарів з бази даних.
    /// </summary>
    /// <returns>Список доменних сутностей <see cref="Product"/>.</returns>
    Task<List<Product>> GetAllAsync();

    /// <summary>
    /// Знаходить товар за його унікальним ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару у строковому представленні.</param>
    /// <returns>Знайдений екземпляр <see cref="Product"/> або <c>null</c>, якщо товар відсутній.</returns>
    Task<Product?> GetByIdAsync(string id);

    /// <summary>
    /// Зберігає новий товар у сховищі даних.
    /// Якщо Id не задано, генерується новий унікальний ключ.
    /// </summary>
    /// <param name="product">Екземпляр сутності товару для збереження.</param>
    Task CreateAsync(Product product);

    /// <summary>
    /// Оновлює інформацію про існуючий товар у сховищі даних.
    /// </summary>
    /// <param name="product">Оновлений екземпляр товару із дійсним ідентифікатором.</param>
    Task UpdateAsync(Product product);

    /// <summary>
    /// Видаляє товар із бази даних за його ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару, що підлягає видаленню.</param>
    Task DeleteAsync(string id);
}