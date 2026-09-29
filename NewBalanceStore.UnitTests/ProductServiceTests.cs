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