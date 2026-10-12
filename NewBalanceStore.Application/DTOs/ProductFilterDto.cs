namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO з критеріями фільтрації, пошуку та пагінації для вибірки товарів з каталогу.
/// </summary>
public class ProductFilterDto
{
    /// <summary>
    /// Пошуковий запит для фільтрації за назвою або описом товару.
    /// </summary>
    public string? SearchTerm { get; set; }

    /// <summary>
    /// Мінімальна ціна для фільтрації діапазону.
    /// </summary>
    public decimal? MinPrice { get; set; }

    /// <summary>
    /// Максимальна ціна для фільтрації діапазону.
    /// </summary>
    public decimal? MaxPrice { get; set; }

    /// <summary>
    /// Фільтр за категорією товару (наприклад, "Running", "Lifestyle").
    /// </summary>
    public string? Category { get; set; }

    /// <summary>
    /// Прапорець для підвищеного пріоритету або промо-вибірки (опціонально).
    /// </summary>
    public bool? IsBoosted { get; set; }

    /// <summary>
    /// Критерій сортування списку ("price_asc", "price_desc", "name").
    /// </summary>
    public string? SortBy { get; set; }

    /// <summary>
    /// Номер сторінки для пагінації результатів (за замовчуванням 1).
    /// </summary>
    public int PageNumber { get; set; } = 1;

    /// <summary>
    /// Кількість елементів на одній сторінці (за замовчуванням 10).
    /// </summary>
    public int PageSize { get; set; } = 10;
}