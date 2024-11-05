namespace BE_CRUDMascotas.Models.DTO
{
    public class mascotaDTO
    {
        public int Id { get; set; }

        public string nombre { get; set; }
        public string Raza { get; set; }

        public string Color { get; set; }
        public int Edad { get; set; }

        public float Peso { get; set; }
    }
}
