using AutoMapper;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Interfaces;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        var products = await _repository.GetAllAsync();
        return products.Select(MapToDto);
    }

    public async Task<ProductDto?> GetByIdAsync(string id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto dto)
    {
        var product = MapToEntity(dto);
        await _repository.CreateAsync(product);
        return MapToDto(product);
    }

    public async Task<bool> UpdateAsync(string id, CreateProductDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return false;

        var productToUpdate = MapToEntity(dto);
        if (int.TryParse(id, out int parsedId))
        {
            productToUpdate.Id = parsedId;
        }

        await _repository.UpdateAsync(productToUpdate);
        return true;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
    public async Task<IEnumerable<ProductDto>> GetFilteredProductsAsync(ProductFilterDto filter)
    {
        var products = (await _repository.GetAllAsync()).AsEnumerable();

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var term = filter.SearchTerm.Trim().ToLower();
            products = products.Where(p =>
                (p.Name != null && p.Name.ToLower().Contains(term)) ||
                (p.Description != null && p.Description.ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(filter.Category))
        {
            products = products.Where(p => p.Category != null &&
                p.Category.Equals(filter.Category, StringComparison.OrdinalIgnoreCase));
        }

        if (filter.MinPrice.HasValue)
        {
            products = products.Where(p => p.Price >= filter.MinPrice.Value);
        }

        if (filter.MaxPrice.HasValue)
        {
            products = products.Where(p => p.Price <= filter.MaxPrice.Value);
        }

        products = filter.SortBy?.ToLower() switch
        {
            "price_asc" => products.OrderBy(p => p.Price),
            "price_desc" => products.OrderByDescending(p => p.Price),
            "name" => products.OrderBy(p => p.Name),
            _ => products
        };

        return products.Select(MapToDto);
    }

    private static ProductDto MapToDto(Product entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name,
        Description = entity.Description,
        Type = entity.Type,
        Category = entity.Category,
        Gender = entity.Gender,
        Price = entity.Price,
        OldPrice = entity.OldPrice,
        Images = entity.Images,
        IsNew = entity.IsNew,
        Variants = entity.Variants?.Select(v => new CreateProductVariantDto
        {
            Color = v.Color,
            Size = v.Size,
            Quantity = v.Quantity
        }).ToList() ?? new()
    };

    private static Product MapToEntity(CreateProductDto dto) => new()
    {
        Name = dto.Name,
        Description = dto.Description,
        Type = dto.Type,
        Category = dto.Category,
        Gender = dto.Gender,
        Price = dto.Price,
        OldPrice = dto.OldPrice,
        Images = dto.Images,
        IsNew = dto.IsNew,
        Variants = dto.Variants?.Select(v => new ProductVariant
        {
            Color = v.Color,
            Size = v.Size,
            Quantity = v.Quantity
        }).ToList() ?? new()
    };
}