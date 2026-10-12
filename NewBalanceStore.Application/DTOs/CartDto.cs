namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO позиції товару в кошику покупок.
/// </summary>
public class CartItemDto
{
    /// <summary>
    /// Ідентифікатор товару.
    /// </summary>
    public string ProductId { get; set; } = string.Empty;

    /// <summary>
    /// Назва товару для відображення у списку кошика.
    /// </summary>
    public string ProductName { get; set; } = string.Empty;

    /// <summary>
    /// Обраний розмір товару.
    /// </summary>
    public string Size { get; set; } = string.Empty;

    /// <summary>
    /// Ціна за одиницю товару.
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Кількість замовлених одиниць.
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// Посилання на головне прев'ю-зображення товару.
    /// </summary>
    public string ImageUrl { get; set; } = string.Empty;
}

/// <summary>
/// DTO кошика покупок із загальним списком товарів та автоматично обчисленою сумою.
/// </summary>
public class CartDto
{
    /// <summary>
    /// Ідентифікатор користувача або сесії власника кошика.
    /// </summary>
    public string UserId { get; set; } = string.Empty;

    /// <summary>
    /// Список позицій у кошику.
    /// </summary>
    public List<CartItemDto> Items { get; set; } = new();

    /// <summary>
    /// Загальна сумарна вартість усіх товарів у кошику.
    /// </summary>
    public decimal TotalAmount => Items.Sum(x => x.Price * x.Quantity);
}

/// <summary>
/// DTO для додавання товару до кошика.
/// </summary>
public class AddToCartDto
{
    /// <summary>
    /// Ідентифікатор товару.
    /// </summary>
    public string ProductId { get; set; } = string.Empty;

    /// <summary>
    /// Обраний розмір товару.
    /// </summary>
    public string Size { get; set; } = string.Empty;

    /// <summary>
    /// Кількість одиниць товару для додавання (за замовчуванням 1).
    /// </summary>
    public int Quantity { get; set; } = 1;
}