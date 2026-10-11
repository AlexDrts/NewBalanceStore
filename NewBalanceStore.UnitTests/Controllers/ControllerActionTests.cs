using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.Application.Interfaces;
using NewBalanceStore.Application.Services;
using NewBalanceStore.Domain.Interfaces;
using NewBalanceStore.WebApi.Controllers;
using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.UnitTests.Controllers;

[TestFixture]
public class ProductsControllerTests
{
    private Mock<IProductService> _productServiceMock = null!;
    private Mock<IPhotoService> _photoServiceMock = null!;
    private ProductsController _controller = null!;

    [SetUp]
    public void SetUp()
    {
        _productServiceMock = new Mock<IProductService>();
        _photoServiceMock = new Mock<IPhotoService>();
        _controller = new ProductsController(_productServiceMock.Object, _photoServiceMock.Object);
    }

    [Test]
    public async Task GetProducts_ReturnsOkAndPassesFilterToService()
    {
        var filter = new ProductFilterDto { SearchTerm = "574" };
        _productServiceMock.Setup(s => s.GetFilteredProductsAsync(filter))
            .ReturnsAsync(Array.Empty<ProductDto>());

        var result = await _controller.GetProducts(filter);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
        _productServiceMock.Verify(s => s.GetFilteredProductsAsync(filter), Times.Once);
    }

    [Test]
    public async Task GetById_WhenProductExists_ReturnsOk()
    {
        _productServiceMock.Setup(s => s.GetByIdAsync("1"))
            .ReturnsAsync(new ProductDto { Id = 1, Name = "Sneaker" });

        var result = await _controller.GetById("1");

        Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
        Assert.That(((OkObjectResult)result.Result!).Value, Is.InstanceOf<ProductDto>());
    }

    [Test]
    public async Task GetById_WhenProductDoesNotExist_ReturnsNotFound()
    {
        _productServiceMock.Setup(s => s.GetByIdAsync("missing")).ReturnsAsync((ProductDto?)null);

        var result = await _controller.GetById("missing");

        Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task Create_ReturnsCreatedAtAction()
    {
        var dto = new CreateProductDto { Name = "Sneaker" };
        _productServiceMock.Setup(s => s.CreateAsync(dto))
            .ReturnsAsync(new ProductDto { Id = 7, Name = "Sneaker" });

        var result = await _controller.Create(dto);

        Assert.That(result.Result, Is.InstanceOf<CreatedAtActionResult>());
        var created = (CreatedAtActionResult)result.Result!;
        Assert.That(created.ActionName, Is.EqualTo(nameof(ProductsController.GetById)));
        Assert.That(created.RouteValues!["id"], Is.EqualTo(7));
        _productServiceMock.Verify(s => s.CreateAsync(dto), Times.Once);
    }

    [Test]
    public async Task Update_WhenProductExists_ReturnsNoContent()
    {
        var dto = new CreateProductDto { Name = "Updated sneaker" };
        _productServiceMock.Setup(s => s.UpdateAsync("1", dto)).ReturnsAsync(true);

        var result = await _controller.Update("1", dto);

        Assert.That(result, Is.InstanceOf<NoContentResult>());
    }

    [Test]
    public async Task Update_WhenProductDoesNotExist_ReturnsNotFound()
    {
        _productServiceMock.Setup(s => s.UpdateAsync("missing", It.IsAny<CreateProductDto>()))
            .ReturnsAsync(false);

        var result = await _controller.Update("missing", new CreateProductDto());

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task Delete_WhenProductExists_ReturnsNoContent()
    {
        _productServiceMock.Setup(s => s.DeleteAsync("1")).ReturnsAsync(true);

        var result = await _controller.Delete("1");

        Assert.That(result, Is.InstanceOf<NoContentResult>());
    }

    [Test]
    public async Task Delete_WhenProductDoesNotExist_ReturnsNotFound()
    {
        _productServiceMock.Setup(s => s.DeleteAsync("missing")).ReturnsAsync(false);

        var result = await _controller.Delete("missing");

        Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
    }

    [Test]
    public async Task UploadImage_WhenFileIsEmpty_ReturnsBadRequestWithoutCallingPhotoService()
    {
        var file = new FormFile(new MemoryStream(), 0, 0, "file", "empty.png");

        var result = await _controller.UploadImage(file);

        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        _photoServiceMock.Verify(s => s.AddPhotoAsync(It.IsAny<Stream>(), It.IsAny<string>()), Times.Never);
    }

    [Test]
    public async Task UploadImage_WhenPhotoServiceReturnsUrl_ReturnsOk()
    {
        var file = new FormFile(new MemoryStream(new byte[] { 1 }), 0, 1, "file", "shoe.png");
        _photoServiceMock.Setup(s => s.AddPhotoAsync(It.IsAny<Stream>(), "shoe.png"))
            .ReturnsAsync("https://example.test/shoe.png");

        var result = await _controller.UploadImage(file);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
        _photoServiceMock.Verify(s => s.AddPhotoAsync(It.IsAny<Stream>(), "shoe.png"), Times.Once);
    }

    [Test]
    public async Task UploadImage_WhenPhotoServiceReturnsNoUrl_ReturnsBadRequest()
    {
        var file = new FormFile(new MemoryStream(new byte[] { 1 }), 0, 1, "file", "shoe.png");
        _photoServiceMock.Setup(s => s.AddPhotoAsync(It.IsAny<Stream>(), "shoe.png"))
            .ReturnsAsync(string.Empty);

        var result = await _controller.UploadImage(file);

        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }
}

[TestFixture]
public class OrdersControllerTests
{
    private Mock<IOrderService> _orderServiceMock = null!;
    private OrdersController _controller = null!;

    [SetUp]
    public void SetUp()
    {
        _orderServiceMock = new Mock<IOrderService>();
        _controller = new OrdersController(_orderServiceMock.Object);
    }

    [Test]
    public async Task Create_ReturnsCreatedAtAction()
    {
        var dto = new CreateOrderDto { CustomerName = "John Doe" };
        _orderServiceMock.Setup(s => s.CreateOrderAsync(dto))
            .ReturnsAsync(new OrderDto { Id = 3, CustomerName = "John Doe" });

        var result = await _controller.Create(dto);

        Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
        var created = (CreatedAtActionResult)result;
        Assert.That(created.ActionName, Is.EqualTo(nameof(OrdersController.GetById)));
        Assert.That(created.RouteValues!["id"], Is.EqualTo(3));
    }

    [Test]
    public async Task GetById_WhenOrderExists_ReturnsOk()
    {
        _orderServiceMock.Setup(s => s.GetOrderByIdAsync(3))
            .ReturnsAsync(new OrderDto { Id = 3 });

        var result = await _controller.GetById(3);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task GetById_WhenOrderDoesNotExist_ReturnsNotFound()
    {
        _orderServiceMock.Setup(s => s.GetOrderByIdAsync(999)).ReturnsAsync((OrderDto?)null);

        var result = await _controller.GetById(999);

        Assert.That(result, Is.InstanceOf<NotFoundResult>());
    }

    [Test]
    public async Task UpdateStatus_DelegatesToServiceAndReturnsNoContent()
    {
        _orderServiceMock.Setup(s => s.UpdateOrderStatusAsync(3, "Shipped"))
            .Returns(Task.CompletedTask);

        var result = await _controller.UpdateStatus(3, "Shipped");

        Assert.That(result, Is.InstanceOf<NoContentResult>());
        _orderServiceMock.Verify(s => s.UpdateOrderStatusAsync(3, "Shipped"), Times.Once);
    }
}

[TestFixture]
public class AuthControllerTests
{
    private Mock<IAuthService> _authServiceMock = null!;
    private AuthController _controller = null!;

    [SetUp]
    public void SetUp()
    {
        _authServiceMock = new Mock<IAuthService>();
        _controller = new AuthController(_authServiceMock.Object);
    }

    [Test]
    public async Task Register_WhenSuccessful_ReturnsOk()
    {
        var dto = new UserRegisterDto { Email = "test@example.com" };
        _authServiceMock.Setup(s => s.RegisterAsync(dto))
            .ReturnsAsync(new AuthResponseDto { Email = dto.Email, Token = "token" });

        var result = await _controller.Register(dto);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task Register_WhenEmailAlreadyExists_ReturnsBadRequest()
    {
        var dto = new UserRegisterDto { Email = "test@example.com" };
        _authServiceMock.Setup(s => s.RegisterAsync(dto))
            .ThrowsAsync(new InvalidOperationException("duplicate"));

        var result = await _controller.Register(dto);

        Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public async Task Login_WhenSuccessful_ReturnsOk()
    {
        var dto = new UserLoginDto { Email = "test@example.com", Password = "secret" };
        _authServiceMock.Setup(s => s.LoginAsync(dto))
            .ReturnsAsync(new AuthResponseDto { Email = dto.Email, Token = "token" });

        var result = await _controller.Login(dto);

        Assert.That(result, Is.InstanceOf<OkObjectResult>());
    }

    [Test]
    public async Task Login_WhenCredentialsAreInvalid_ReturnsUnauthorized()
    {
        var dto = new UserLoginDto { Email = "test@example.com", Password = "wrong" };
        _authServiceMock.Setup(s => s.LoginAsync(dto))
            .ThrowsAsync(new UnauthorizedAccessException("invalid credentials"));

        var result = await _controller.Login(dto);

        Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
    }
}
