using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Commands;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data.Entities;

namespace ContactApp.Backend.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactResponse>();
            CreateMap<InsertContactCommand, Contact>();
            CreateMap<UpdateContactCommand, Contact>();
        }
    }
}
