using System;
using System.Collections.Generic;
using System.Text;

namespace NewBalanceStore.Application.DTOs;

/// <summary>
/// DTO для створення або оновлення товару адміністратором платформи.
/// Містить усі властивості та вкладені варіації моделі без ідентифікатора.
/// </summary>
public class CreateProductDto
{
    /// <summary>
    /// Назва товару (наприклад, "New Balance 574 Core").
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Текстовий опис моделі, матеріалів та особливостей амортизації.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Тип виробу ("Footwear", "Clothing", "Accessories").
    /// </summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>
    /// Категорія товару ("Running", "Lifestyle", "Trail" тощо).
    /// </summary>
    public string Category { get; set; } = string.Empty;

    /// <summary>
    /// Цільова активність (наприклад, "Casual", "Training").
    /// </summary>
    public string Activity { get; set; } = string.Empty;

    /// <summary>
    /// Гендерна приналежність моделі ("Men", "Women", "Unisex").
    /// </summary>
    public string Gender { get; set; } = string.Empty;

    /// <summary>
    /// Роздрібна ціна товару.
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Попередня ціна до знижки (опціонально).
    /// </summary>
    public decimal? OldPrice { get; set; }

    /// <summary>
    /// Прапорець новинки в каталозі.
    /// </summary>
    public bool IsNew { get; set; }

    /// <summary>
    /// Перелік доступних назв кольорів.
    /// </summary>
    public List<string> Colors { get; set; } = new();

    /// <summary>
    /// Словник URL-посилань на зображення товару у розрізі кольорів.
    /// </summary>
    public Dictionary<string, List<string>> Images { get; set; } = new();

    /// <summary>
    /// Список складських варіацій (розміри, кольори, кількість).
    /// </summary>
    public List<CreateProductVariantDto> Variants { get; set; } = new();
}