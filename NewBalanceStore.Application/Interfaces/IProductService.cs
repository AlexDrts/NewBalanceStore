using NewBalanceStore.Application.DTOs;

namespace NewBalanceStore.Application.Interfaces;

/// <summary>
/// Контракт сервісу прикладної бізнес-логіки управління товарами.
/// Забезпечує фільтрацію, пошук, пагінацію, мапінг та валідацію операцій над товарами.
/// </summary>
public interface IProductService
{
    /// <summary>
    /// Отримує відфільтрований перелік товарів відповідно до критеріїв пошуку, категорій, цін та сортування.
    /// </summary>
    /// <param name="filter">Об'єкт із критеріями фільтрації (<see cref="ProductFilterDto"/>).</param>
    /// <returns>Колекція відфільтрованих об'єктів <see cref="ProductDto"/>.</returns>
    Task<IEnumerable<ProductDto>> GetFilteredProductsAsync(ProductFilterDto filter);

    /// <summary>
    /// Отримує всі товари без застосування додаткових фільтрів.
    /// </summary>
    /// <returns>Повний перелік товарів у вигляді <see cref="ProductDto"/>.</returns>
    Task<IEnumerable<ProductDto>> GetAllAsync();

    /// <summary>
    /// Отримує детальну інформацію про конкретний товар за його ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару.</param>
    /// <returns>Об'єкт <see cref="ProductDto"/> або <c>null</c>, якщо товар не знайдено.</returns>
    Task<ProductDto?> GetByIdAsync(string id);

    /// <summary>
    /// Створює новий товар на основі переданих вхідних даних та зберігає його в репозиторії.
    /// </summary>
    /// <param name="dto">Вхідні дані для створення товару (<see cref="CreateProductDto"/>).</param>
    /// <returns>Створений об'єкт <see cref="ProductDto"/> із присвоєним ідентифікатором.</returns>
    Task<ProductDto> CreateAsync(CreateProductDto dto);

    /// <summary>
    /// Оновлює властивості та варіації існуючого товару за вказаним ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару для оновлення.</param>
    /// <param name="dto">Нові дані товару (<see cref="CreateProductDto"/>).</param>
    /// <returns><c>true</c>, якщо товар успішно знайдено та оновлено; інакше <c>false</c>.</returns>
    Task<bool> UpdateAsync(string id, CreateProductDto dto);

    /// <summary>
    /// Видаляє товар із каталогу за його ідентифікатором.
    /// </summary>
    /// <param name="id">Ідентифікатор товару для видалення.</param>
    /// <returns><c>true</c>, якщо товар існував та був видалений; інакше <c>false</c>.</returns>
    Task<bool> DeleteAsync(string id);
}