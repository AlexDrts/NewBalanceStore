using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using NewBalanceStore.Application.Interfaces;
using NewBalanceStore.Application.Services;
using NewBalanceStore.Domain.Interfaces;
using NewBalanceStore.IntegrationTests.Infrastructure;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace NewBalanceStore.IntegrationTests;

[TestFixture]
public class AuthAndStartupIntegrationTests
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
    public async Task RegisterAndLogin_UseRealAuthServiceAndReturnJsonToken()
    {
        var email = $"integration_{Guid.NewGuid():N}@example.test";
        const string password = "IntegrationPassword123!";
        var registerDto = new NewBalanceStore.Application.DTOs.UserRegisterDto
        {
            Email = email,
            Password = password,
            FullName = "Integration User"
        };

        using var registered = await _client.PostAsJsonAsync("/api/auth/register", registerDto);
        var registration = await registered.Content.ReadFromJsonAsync<NewBalanceStore.Application.DTOs.AuthResponseDto>();
        using var duplicate = await _client.PostAsJsonAsync("/api/auth/register", registerDto);
        using var login = await _client.PostAsJsonAsync("/api/auth/login",
            new NewBalanceStore.Application.DTOs.UserLoginDto { Email = email, Password = password });
        var loginResponse = await login.Content.ReadFromJsonAsync<NewBalanceStore.Application.DTOs.AuthResponseDto>();
        using var rejectedLogin = await _client.PostAsJsonAsync("/api/auth/login",
            new NewBalanceStore.Application.DTOs.UserLoginDto { Email = email, Password = "wrong" });

        Assert.That(registered.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(registered.Content.Headers.ContentType?.MediaType, Is.EqualTo("application/json"));
        Assert.That(registration!.Token, Is.Not.Empty);
        Assert.That(duplicate.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
        Assert.That(login.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        Assert.That(loginResponse!.Email, Is.EqualTo(email));
        Assert.That(rejectedLogin.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));
    }

    [Test]
    public void Application_StartsAndResolvesApplicationServicesWithLocalRepositories()
    {
        using var scope = _factory.Services.CreateScope();

        Assert.That(scope.ServiceProvider.GetRequiredService<IProductService>(), Is.InstanceOf<ProductService>());
        Assert.That(scope.ServiceProvider.GetRequiredService<IOrderService>(), Is.InstanceOf<OrderService>());
        Assert.That(scope.ServiceProvider.GetRequiredService<IAuthService>(), Is.Not.Null);
        Assert.That(scope.ServiceProvider.GetRequiredService<IProductRepository>(), Is.Not.Null);
        Assert.That(scope.ServiceProvider.GetRequiredService<IOrderRepository>(), Is.Not.Null);
    }
}
