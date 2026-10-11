FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["NewBalanceStore.WebApi/NewBalanceStore.WebApi.csproj", "NewBalanceStore.WebApi/"]
COPY ["NewBalanceStore.Application/NewBalanceStore.Application.csproj", "NewBalanceStore.Application/"]
COPY ["NewBalanceStore.Domain/NewBalanceStore.Domain.csproj", "NewBalanceStore.Domain/"]
COPY ["NewBalanceStore.Infrastructure/NewBalanceStore.Infrastructure.csproj", "NewBalanceStore.Infrastructure/"]
RUN dotnet restore "NewBalanceStore.WebApi/NewBalanceStore.WebApi.csproj"
COPY . .
WORKDIR "/src/NewBalanceStore.WebApi"
RUN dotnet build "NewBalanceStore.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NewBalanceStore.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NewBalanceStore.WebApi.dll"]