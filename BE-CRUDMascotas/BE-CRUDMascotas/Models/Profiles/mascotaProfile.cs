using AutoMapper;
using BE_CRUDMascotas.Models.DTO;

namespace BE_CRUDMascotas.Models.Profiles
{
    public class mascotaProfile:Profile
    {
        public mascotaProfile()
        {
            CreateMap<Mascota, mascotaDTO>();
            CreateMap<mascotaDTO, Mascota>();
        }
    }
}
