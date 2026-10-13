using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO для передачі відомостей про варіацію товару (розмір, колір та кількість)
/// при додаванні або модифікації товару.
/// </summary>
public class CreateProductVariantDto
{
    /// <summary>
    /// Колір варіації товару.
    /// </summary>
    public string Color { get; set; } = string.Empty;

    /// <summary>
    /// Розмір варіації (наприклад, "8.5", "9.5", "XL").
    /// </summary>
    public string Size { get; set; } = string.Empty; 

    /// <summary>
    /// Кількість одиниць варіації в наявності.
    /// </summary>
    public int Quantity { get; set; }
}