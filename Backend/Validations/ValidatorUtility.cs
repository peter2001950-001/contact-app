using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Internal;

[assembly: InternalsVisibleTo("ContactApp.Backend")]
namespace ContactApp.Backend.Validations
{
    public class ValidatorUtility
    {
    }

    internal class PersonNameValidator : AbstractValidator<string>
    {
        public PersonNameValidator()
        {
            RuleFor(x => x).Matches(@"^[A-Za-z-\'\s]+$");
        }
    }

    internal class TelephoneValidator : AbstractValidator<string>
    {
        public TelephoneValidator()
        {
            RuleFor(x => x).Matches(@"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$").WithMessage("Telephone is in an invalid format");
        }
    }
    public class CamelCasePropertyNameResolver
    {
        public static string ResolvePropertyName(Type type, MemberInfo memberInfo, LambdaExpression expression)
        {
            return ToCamelCase(DefaultPropertyNameResolver(type, memberInfo, expression));
        }

        private static string DefaultPropertyNameResolver(Type type, MemberInfo memberInfo, LambdaExpression expression)
        {
            if (expression != null)
            {
                var chain = PropertyChain.FromExpression(expression);
                if (chain.Count > 0) return chain.ToString();
            }

            if (memberInfo != null)
            {
                return memberInfo.Name;
            }

            return null;
        }

        private static string ToCamelCase(string s)
        {
            if (string.IsNullOrEmpty(s) || !char.IsUpper(s[0]))
            {
                return s;
            }

            var chars = s.ToCharArray();

            for (var i = 0; i < chars.Length; i++)
            {
                if (i == 1 && !char.IsUpper(chars[i]))
                {
                    break;
                }

                var hasNext = (i + 1 < chars.Length);
                if (i > 0 && hasNext && !char.IsUpper(chars[i + 1]))
                {
                    break;
                }

                chars[i] = char.ToLower(chars[i], CultureInfo.InvariantCulture);
            }

            return new string(chars);
        }
    }
}