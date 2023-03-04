using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactApp.Backend.Validations
{
    public class ValidationError
    {
        public ValidationError()
        {

        }
        public ValidationError(string field, params string[] message)
        {
            Field = field;
            Message = message.ToList();
        }

        public string Field { get; set; }
        public List<string> Message { get; set; }
    }
}
