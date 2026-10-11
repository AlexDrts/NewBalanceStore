using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using NewBalanceStore.Application.DTOs;
using NewBalanceStore.IntegrationTests.Infrastructure;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.IntegrationTests;

[TestFixture]
public class ProductsApiIntegrationTests
{
    private TestApiFactory _factory = null!;
    private HttpClient _client = null!;

    [SetUp]
    public void SetUp()
    {
        _factory = new TestApiFactory();
        _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    [Test]
    public async Task GetProducts_ReturnsSeededProductsAsJson()
    {
        using var response = await _client.GetAsync("/api/products");
        var products = await response.Content.ReadFromJsonAsync<List<ProductDto>>();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(response.Content.Headers.ContentType?.MediaType, Is.EqualTo("application/json"));
        Assert.That(products, Has.Count.EqualTo(3));
        Assert.That(products!.Select(product => product.Name),
            Does.Contain("New Balance 574").And.Contain("Logo Tee"));
    }

    [Test]
    public async Task GetProducts_AppliesServiceFiltersAndSort()
    {
        using var response = await _client.GetAsync("/api/products?category=Shoes&minPrice=100&sortBy=price_desc");
        var products = await response.Content.ReadFromJsonAsync<List<ProductDto>>();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(products!.Select(product => product.Id), Is.EqualTo(new[] { 2, 1 }));
    }

    [Test]
    public async Task GetById_ReturnsProductOrNotFound()
    {
        using var found = await _client.GetAsync("/api/products/1");
        var product = await found.Content.ReadFromJsonAsync<ProductDto>();
        using var missing = await _client.GetAsync("/api/products/99999");

        Assert.That(found.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(product!.Name, Is.EqualTo("New Balance 574"));
        Assert.That(missing.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task ProductWrites_EnforceAdminRoleAndPersistChanges()
    {
        var createDto = new CreateProductDto
        {
            Name = "Integration Runner",
            Category = "Shoes",
            Price = 199
        };

        using var unauthenticated = await _client.PostAsJsonAsync("/api/products", createDto);
        using var userRequest = CreateJsonRequest(HttpMethod.Post, "/api/products", createDto, "Customer");
        using var forbidden = await _client.SendAsync(userRequest);
        using var adminCreateRequest = CreateJsonRequest(HttpMethod.Post, "/api/products", createDto, "Admin");
        using var created = await _client.SendAsync(adminCreateRequest);
        var createdProduct = await created.Content.ReadFromJsonAsync<ProductDto>();

        Assert.That(unauthenticated.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
        Assert.That(forbidden.StatusCode, Is.EqualTo(HttpStatusCode.Forbidden));
        Assert.That(created.StatusCode, Is.EqualTo(HttpStatusCode.Created));
        Assert.That(createdProduct, Is.Not.Null);
        Assert.That(createdProduct!.Id, Is.GreaterThan(0));

        var productId = createdProduct.Id.ToString();
        using var updateRequest = CreateJsonRequest(HttpMethod.Put, $"/api/products/{productId}",
            new CreateProductDto { Name = "Updated Runner", Category = "Shoes", Price = 210 }, "Admin");
        using var updated = await _client.SendAsync(updateRequest);
        using var getUpdated = await _client.GetAsync($"/api/products/{productId}");
        var updatedProduct = await getUpdated.Content.ReadFromJsonAsync<ProductDto>();

        Assert.That(updated.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        Assert.That(updatedProduct!.Name, Is.EqualTo("Updated Runner"));
        Assert.That(updatedProduct.Price, Is.EqualTo(210));

        using var deleteRequest = new HttpRequestMessage(HttpMethod.Delete, $"/api/products/{productId}");
        deleteRequest.Headers.Add("X-Test-Role", "Admin");
        using var deleted = await _client.SendAsync(deleteRequest);
        using var getDeleted = await _client.GetAsync($"/api/products/{productId}");

        Assert.That(deleted.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
        Assert.That(getDeleted.StatusCode, Is.EqualTo(HttpStatusCode.NotFound));
    }

    [Test]
    public async Task UploadImage_UsesLocalPhotoService()
    {
        using var form = new MultipartFormDataContent();
        using var image = new ByteArrayContent([1, 2, 3]);
        image.Headers.ContentType = new MediaTypeHeaderValue("image/png");
        form.Add(image, "file", "shoe.png");

        using var response = await _client.PostAsync("/api/products/upload-image", form);
        var payload = await response.Content.ReadFromJsonAsync<Dictionary<string, string>>();

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(payload!["url"], Is.EqualTo("https://local.test/photos/shoe.png"));
    }

    private static HttpRequestMessage CreateJsonRequest<T>(HttpMethod method, string uri, T body, string role)
    {
        var request = new HttpRequestMessage(method, uri)
        {
            Content = JsonContent.Create(body)
        };
        request.Headers.Add("X-Test-Role", role);
        return request;
    }
}
