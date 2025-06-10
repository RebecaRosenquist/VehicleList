namespace VehicleApi.Models
{
    public class Car
    {
        public int Id { get; set; }                   // Primärnyckel
        public string VIN { get; set; }               // Fordonsnummer
        public string LicensePlateNumber { get; set; }
        public string ModelName { get; set; }
        public string Colour {get; set;}

        // Foreign Key 
        public int BrandId { get; set; }
        public Brand Brand { get; set; }               // Kopplar en brand till varje bil

        // En bil kan ha många utrustningar och varje utrustning kan ha flera bilar NM(många till många)
        public ICollection<CarEquipment> CarEquipments { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
