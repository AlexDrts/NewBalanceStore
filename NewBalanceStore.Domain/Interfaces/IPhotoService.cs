namespace NewBalanceStore.Domain.Interfaces;

public interface IPhotoService
{
    Task<string> AddPhotoAsync(Stream fileStream, string fileName);
}