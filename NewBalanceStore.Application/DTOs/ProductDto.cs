using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Enums;

namespace NewBalanceStore.Application.DTOs;

public class ProductDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductType Type { get; set; }
    public string Category { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public List<string> Images { get; set; } = new();
    public bool IsNew { get; set; }
    public List<ProductVariant> Variants { get; set; } = new();
}

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ProductType Type { get; set; }
    public string Category { get; set; } = string.Empty;
    public Gender Gender { get; set; }
    public decimal Price { get; set; }
    public decimal? OldPrice { get; set; }
    public List<string> Images { get; set; } = new();
    public bool IsNew { get; set; }
    public List<ProductVariant> Variants { get; set; } = new();
}