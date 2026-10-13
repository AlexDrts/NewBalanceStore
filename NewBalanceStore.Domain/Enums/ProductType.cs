using System;

namespace NewBalanceStore.Domain.Enums;

/// <summary>
/// Основні товарні типи номенклатури магазину.
/// Визначають класифікацію виробу та специфічні характеристики (наприклад, розмірні сітки).
/// </summary>
public enum ProductType
{
    /// <summary>
    /// Спортивне, бігове та повсякденне взуття (кросівки, кеди).
    /// </summary>
    Footwear,

    /// <summary>
    /// Спортивний та повсякденний одяг (худі, футболки, штани, куртки).
    /// </summary>
    Clothing,

    /// <summary>
    /// Аксесуари (шкарпетки, кепки, рюкзаки, сумки).
    /// </summary>
    Accessories
}