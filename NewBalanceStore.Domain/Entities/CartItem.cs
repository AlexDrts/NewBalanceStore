using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Представляє окрему одиницю товару в кошику покупця з обраними характеристиками.
/// </summary>
public class CartItem
{
    /// <summary>
    /// Ідентифікатор обраного товару.
    /// </summary>
    public string ProductId { get; set; } = string.Empty;

    /// <summary>
    /// Обраний колір товару.
    /// </summary>
    public string Color { get; set; } = string.Empty;

    /// <summary>
    /// Обраний розмір товару.
    /// </summary>
    public string Size { get; set; } = string.Empty;

    /// <summary>
    /// Кількість одиниць товару даного розміру та кольору.
    /// </summary>
    public int Quantity { get; set; }
}

