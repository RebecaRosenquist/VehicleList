namespace VehicleApi.Dtos
{
    public class CarDto
    {
        public int Id { get; set; }
        public string VIN { get; set; } = string.Empty;
        public string LicensePlateNumber { get; set; } = string.Empty;
        public string ModelName { get; set; } = string.Empty;
        public string Colour { get; set; } = string.Empty;
        public int BrandId { get; set; }
        public BrandDto Brand { get; set; } = new BrandDto();
     
        public List<CarEquipmentDto> CarEquipments { get; set; } = new();
        public List<int> CarEquipmentIds => CarEquipments.Select(e => e.Id).ToList();
    }
}