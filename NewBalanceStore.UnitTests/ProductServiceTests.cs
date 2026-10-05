using Moq;
using NUnit.Framework;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Services;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;

using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.UnitTests
{
    [TestFixture]
    public class ProductServiceTests
    {
        private Mock<IProductRepository> _repositoryMock = null!;
        private ProductService _productService = null!;

        public Mock<IProductRepository> RepositoryMock { get => _repositoryMock; set => _repositoryMock = value; }
        public ProductService ProductService { get => _productService; set => _productService = value; }

        [SetUp]
        public void SetUp()
        {
            RepositoryMock = new Mock<IProductRepository>();
            ProductService = new ProductService(RepositoryMock.Object);
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnAllProducts()
        {
            var products = new List<Product>
            {
            new Product { Id = 1, Name = "Sneakers" },
            new Product { Id = 2, Name = "T-Shirt" }
            };

            RepositoryMock.Setup(r => r.GetAllAsync())
                                .ReturnsAsync(products);

            var result = await ProductService.GetAllAsync();

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetByIdAsync_WhenProductExists_ShouldReturnProduct()
        {
            var testProduct = new Product { Id = 1, Name = "New Balance 574", Price = 120 };
            RepositoryMock.Setup(r => r.GetByIdAsync("1")).ReturnsAsync(testProduct);

            var result = await ProductService.GetByIdAsync("1");

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo("New Balance 574"));
        }

        [Test]
        public async Task GetFilteredProductsAsync_ShouldFilterBySearchTerm()
        {
            var testProducts = new List<Product>
            {
                new Product { Id = 1, Name = "New Balance 574", Description = "Classic sneaker" },
                new Product { Id = 2, Name = "Nike Air Max", Description = "Running shoe" }
            };
            RepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(testProducts);

            var filter = new ProductFilterDto { SearchTerm = "574" };

            var result = await ProductService.GetFilteredProductsAsync(filter);

            Assert.That(result.Count(), Is.EqualTo(1));
            Assert.That(result.First().Name, Is.EqualTo("New Balance 574"));
        }

        [Test]
        public async Task GetFilteredProductsAsync_ShouldSearchDescriptionCaseInsensitively()
        {
            RepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Product>
            {
                new() { Id = 1, Name = "Sneaker", Description = "CLASSIC leather" },
                new() { Id = 2, Name = "T-Shirt", Description = "Cotton" }
            });

            var result = await ProductService.GetFilteredProductsAsync(
                new ProductFilterDto { SearchTerm = "  classic " });

            Assert.That(result.Select(p => p.Id), Is.EqualTo(new[] { 1 }));
        }

        [Test]
        public async Task GetFilteredProductsAsync_ShouldFilterCategoryAndInclusivePriceRange()
        {
            RepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Product>
            {
                new() { Id = 1, Category = "Shoes", Price = 50 },
                new() { Id = 2, Category = "SHOES", Price = 100 },
                new() { Id = 3, Category = "Clothing", Price = 75 },
                new() { Id = 4, Category = "Shoes", Price = 101 }
            });

            var result = await ProductService.GetFilteredProductsAsync(new ProductFilterDto
            {
                Category = "shoes",
                MinPrice = 50,
                MaxPrice = 100
            });

            Assert.That(result.Select(p => p.Id), Is.EqualTo(new[] { 1, 2 }));
        }

        [TestCase("price_asc", new[] { 2, 3, 1 })]
        [TestCase("price_desc", new[] { 1, 3, 2 })]
        [TestCase("name", new[] { 2, 1, 3 })]
        public async Task GetFilteredProductsAsync_ShouldSortResults(string sortBy, int[] expectedIds)
        {
            RepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Product>
            {
                new() { Id = 1, Name = "M", Price = 30 },
                new() { Id = 2, Name = "A", Price = 10 },
                new() { Id = 3, Name = "Z", Price = 20 }
            });

            var result = await ProductService.GetFilteredProductsAsync(new ProductFilterDto { SortBy = sortBy });

            Assert.That(result.Select(p => p.Id), Is.EqualTo(expectedIds));
        }

        [Test]
        public async Task GetFilteredProductsAsync_WhenNoProductsMatch_ShouldReturnEmptyCollection()
        {
            RepositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(new List<Product>
            {
                new() { Id = 1, Name = "Sneaker", Category = "Shoes", Price = 50 }
            });

            var result = await ProductService.GetFilteredProductsAsync(new ProductFilterDto
            {
                SearchTerm = "shirt",
                MinPrice = 100
            });

            Assert.That(result, Is.Empty);
        }

        [Test]
        public async Task GetByIdAsync_ShouldMapProductAndVariantProperties()
        {
            RepositoryMock.Setup(r => r.GetByIdAsync("1")).ReturnsAsync(new Product
            {
                Id = 1,
                Name = "New Balance 574",
                Category = "Shoes",
                Price = 120,
                Variants = new List<ProductVariant>
                {
                    new() { Color = "Grey", Size = "42", Quantity = 3 }
                }
            });

            var result = await ProductService.GetByIdAsync("1");

            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Name, Is.EqualTo("New Balance 574"));
            Assert.That(result.Category, Is.EqualTo("Shoes"));
            Assert.That(result.Price, Is.EqualTo(120));
            Assert.That(result.Variants, Has.Count.EqualTo(1));
            Assert.That(result.Variants[0].Color, Is.EqualTo("Grey"));
            Assert.That(result.Variants[0].Size, Is.EqualTo("42"));
            Assert.That(result.Variants[0].Quantity, Is.EqualTo(3));
        }

        [Test]
        public async Task CreateAsync_ShouldCallRepository()
        {
            var dto = new CreateProductDto { Name = "New Shoe", Price = 100 };

            RepositoryMock.Setup(r => r.CreateAsync(It.IsAny<Product>()))
                           .Returns(Task.CompletedTask);

            await ProductService.CreateAsync(dto);

            RepositoryMock.Verify(r => r.CreateAsync(It.IsAny<Product>()), Times.Once);
        }

        [Test]
        public async Task UpdateAsync_ShouldCallRepository_WhenProductExists()
        {
            var existingProduct = new Product { Id = 123, Name = "Shoe", Price = 100 };
            var dto = new CreateProductDto { Name = "Updated Shoe", Price = 120 };

            RepositoryMock.Setup(r => r.GetByIdAsync("123"))
                           .ReturnsAsync(existingProduct);

            RepositoryMock.Setup(r => r.UpdateAsync(It.IsAny<Product>()))
                           .Returns(Task.CompletedTask);

            await ProductService.UpdateAsync("123", dto);

            RepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Once);
        }

        [Test]
        public async Task UpdateAsync_WhenProductDoesNotExist_ShouldReturnFalseWithoutUpdating()
        {
            RepositoryMock.Setup(r => r.GetByIdAsync("999")).ReturnsAsync((Product?)null);

            var result = await ProductService.UpdateAsync("999", new CreateProductDto { Name = "Shoe" });

            Assert.That(result, Is.False);
            RepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Never);
        }

        [Test]
        public async Task DeleteAsync_ShouldCallRepository_WhenProductExists()
        {
            var existingProduct = new Product { Id = 123, Name = "Shoe", Price = 100 };

            RepositoryMock.Setup(r => r.GetByIdAsync("123"))
                           .ReturnsAsync(existingProduct);

            RepositoryMock.Setup(r => r.DeleteAsync("123"))
                           .Returns(Task.CompletedTask);

            await ProductService.DeleteAsync("123");

            RepositoryMock.Verify(r => r.DeleteAsync("123"), Times.Once);
        }
        [Test]
        public async Task GetByIdAsync_WhenProductDoesNotExist_ShouldReturnNull()
        {
            RepositoryMock.Setup(r => r.GetByIdAsync("999")).ReturnsAsync((Product?)null);

            var result = await ProductService.GetByIdAsync("999");

            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task DeleteAsync_WhenProductDoesNotExist_ShouldNotCallDelete()
        {
            RepositoryMock.Setup(r => r.GetByIdAsync("999")).ReturnsAsync((Product?)null);

            await ProductService.DeleteAsync("999");

            RepositoryMock.Verify(r => r.DeleteAsync(It.IsAny<string>()), Times.Never);
        }
    }
}