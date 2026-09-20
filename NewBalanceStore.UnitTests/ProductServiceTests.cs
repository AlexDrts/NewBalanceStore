using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert; 
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Services;
using NewBalanceStore.Domain.Entities;
using NewBalanceStore.Domain.Interfaces;

namespace NewBalanceStore.UnitTests
{
    [TestFixture]
    public class ProductServiceTests
    {
        private Mock<IProductRepository> _repositoryMock;
        private ProductService _productService;

        [SetUp]
        public void SetUp()
        {
            _repositoryMock = new Mock<IProductRepository>();
            _productService = new ProductService(_repositoryMock.Object);
        }

        [Test]
        public async Task GetAllAsync_ShouldReturnAllProducts()
        {
            var testProducts = new List<Product>
            {
                new Product { Id = 1, Name = "New Balance 574", Price = 120 },
                new Product { Id = 2, Name = "New Balance 990", Price = 200 }
            };
            _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(testProducts);

            var result = await _productService.GetAllAsync();

            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetByIdAsync_WhenProductExists_ShouldReturnProduct()
        {
            var testProduct = new Product { Id = 1, Name = "New Balance 574", Price = 120 };
            _repositoryMock.Setup(r => r.GetByIdAsync("1")).ReturnsAsync(testProduct);

            var result = await _productService.GetByIdAsync("1");

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
            _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(testProducts);

            var filter = new ProductFilterDto { SearchTerm = "574" };

            var result = await _productService.GetFilteredProductsAsync(filter);

            Assert.That(result.Count(), Is.EqualTo(1));
            Assert.That(result.First().Name, Is.EqualTo("New Balance 574"));
        }
    }
}