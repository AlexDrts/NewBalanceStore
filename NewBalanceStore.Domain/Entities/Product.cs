using System;
using System.Collections.Generic;
using System.Text;
using NewBalanceStore.Domain.Enums;

namespace NewBalanceStore.Domain.Entities;

/// <summary>
/// Доменна сутність товару в каталозі інтернет-магазину.
/// Представляє базову модель виробу (взуття, одяг або аксесуари),
/// що містить загальні характеристики та набір варіацій розмірів і кольорів.
/// </summary>
public class Product
{
    /// <summary>
    /// Унікальний ідентифікатор товару.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Комерційна назва товару (наприклад, "New Balance 9060").
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Детальний текстовий опис товару, матеріалів та технологій виготовлення.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Тип виробу (наприклад, "Footwear", "Clothing", "Accessories").
    /// Використовується клієнтською фабрикою для створення конкретних екземплярів моделей.
    /// </summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>
    /// Категорія товару (наприклад, "Running", "Lifestyle", "Trail").
    /// </summary>
    public string Category { get; set; } = string.Empty;

    /// <summary>
    /// Вид активності або призначення (наприклад, "Running", "Walking", "Casual").
    /// </summary>
    public string Activity { get; set; } = string.Empty;

    /// <summary>
    /// Цільова гендерна група виробу ("Men", "Women", "Unisex").
    /// </summary>
    public string Gender { get; set; } = string.Empty;

    /// <summary>
    /// Поточна роздрібна вартість товару у грошовому еквіваленті.
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Попередня ціна товару до застосування знижки (якщо присутня).
    /// </summary>
    public decimal? OldPrice { get; set; }

    /// <summary>
    /// Ознака того, що товар належить до нової колекції або недавніх надходжень.
    /// </summary>
    public bool IsNew { get; set; }

    /// <summary>
    /// Список доступних назв кольорових рішень для даної моделі.
    /// </summary>
    public List<string> Colors { get; set; } = new();

    /// <summary>
    /// Словник зображень товару, згрупованих за назвою кольору (Color -> список URL фотографій).
    /// </summary>
    public Dictionary<string, List<string>> Images { get; set; } = new();

    /// <summary>
    /// Список конкретних складських варіацій товару (комбінації кольору, розміру та залишку).
    /// </summary>
    public List<ProductVariant> Variants { get; set; } = new();
}