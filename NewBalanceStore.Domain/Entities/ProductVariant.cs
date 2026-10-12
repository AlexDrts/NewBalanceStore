using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Представляє конкретну складську варіацію товару (SKU),
/// що визначається певною комбінацією кольору, розміру та доступної кількості.
/// </summary>
public class ProductVariant
{
    /// <summary>
    /// Унікальний ідентифікатор варіації товару.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Ідентифікатор батьківського товару, до якого належить ця варіація.
    /// </summary>
    public int ProductId { get; set; }

    /// <summary>
    /// Навігаційне посилання на екземпляр батьківського товару.
    /// </summary>
    public Product Product { get; set; } = null!;

    /// <summary>
    /// Колір варіації (наприклад, "Castlerock", "Sea Salt").
    /// </summary>
    public string Color { get; set; } = string.Empty;

    /// <summary>
    /// Розмір виробу (наприклад, "9", "10.5" для взуття або "M", "L" для одягу).
    /// </summary>
    public string Size { get; set; } = string.Empty;

    /// <summary>
    /// Залишкова кількість одиниць на складі, доступних для замовлення.
    /// </summary>
    public int Quantity { get; set; }
}