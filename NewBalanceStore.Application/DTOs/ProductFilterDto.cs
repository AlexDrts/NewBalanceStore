namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO з параметрами пошуку, фільтрації та сортування товарів каталогу.
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
    /// Зарезервований прапорець промо-вибірки; наразі сервісом фільтрації не використовується.
    /// </summary>
    public bool? IsBoosted { get; set; }

    /// <summary>
    /// Критерій сортування списку ("price_asc", "price_desc", "name").
    /// </summary>
    public string? SortBy { get; set; }

    /// <summary>
    /// Зарезервований номер сторінки; наразі сервісом фільтрації не використовується.
    /// </summary>
    public int PageNumber { get; set; } = 1;

    /// <summary>
    /// Зарезервована кількість елементів на сторінці; наразі сервісом фільтрації не використовується.
    /// </summary>
    public int PageSize { get; set; } = 10;
}