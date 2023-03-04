using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Commands.Utility;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data;
using ContactApp.Backend.Data.Entities;
using ContactApp.Backend.Utility;
using ContactApp.Backend.Validations;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Commands.Handlers
{
    public class InsertContactHandler : BaseInsertHandler<Contact, InsertContactCommand, ContactResponse>
    {
        public InsertContactHandler(ApplicationDbContext applicationDbContext, IMapper mapper) : base(
            applicationDbContext, mapper)
        {
        }

        public override async Task<bool> CanAddAsync(Contact entity)
        {
            if (await dbContext.Contacts.AnyAsync(x =>
                    x.FirstName.ToLower() == entity.FirstName.ToLower() &&
                    x.Surname.ToLower() == entity.Surname.ToLower() && x.DateOfBirth.Date == entity.DateOfBirth.Date &&
                    x.DateOfBirth.Month == entity.DateOfBirth.Month &&
                    x.DateOfBirth.Year == entity.DateOfBirth.Year))
            {
                throw new ValidationException(new ValidationError("", "Contact already exist"));
            }

            return true;
        }
    }
}
