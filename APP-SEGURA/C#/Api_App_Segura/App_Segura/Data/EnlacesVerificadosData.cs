using App_Segura.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using System.Text;
using System.Text.RegularExpressions;

namespace App_Segura.Data
{
    public class EnlacesVerificadosData
    {

        public static ResultadoVerificacion VerificarEnlace(EnlacesVerificados oVerificacion)
        {
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            string Enlace = oVerificacion.Enlace;
            // Lista de razones de reporte acumuladas
            List<string> razonesReporte = new List<string>();

            // Verificar si el enlace existe
            if (!EnlaceExiste(Enlace))
            {
                razonesReporte.Add("El enlace no existe");
                return new ResultadoVerificacion
                {
                    Success = true,
                    Enlace = Enlace,
                    EsSeguro = false,
                    CantidadConsultas = 0,
                    CantidadReportes = 0,
                    Mensaje = string.Join(", ", razonesReporte)
                };
            }


            sentencia = $"EXECUTE sp_verificar_enlace '" + Enlace + "'";

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                if (dr.Read())
                {
                    
                    bool EsSeguro = Convert.ToBoolean(dr["es_seguro"]);
                    int CantidadConsultas = Convert.ToInt32(dr["cantidad_consultas"]);
                    int CantidadReportes = Convert.ToInt32(dr["cantidad_reportes"]);



                    if (EsSeguro)
                    {
                        // 1. verificamos si el enlace tiene certificado ssl
                        var (tieneCertificado, estadoCertificado) = TieneCertificadoSSL(Enlace);
                        if (!tieneCertificado)
                        {
                            razonesReporte.Add($"El enlace no tiene certificado SSL válido: {estadoCertificado}");
                            ReportarEnlace(Enlace, 7, $"El enlace no tiene certificado SSL válido: {estadoCertificado}");
                        }
                        // 2. Verificamos si tiene una estructura sospechosa
                        if (TieneEstructuraSospechosa(Enlace))
                        {
                            razonesReporte.Add("El enlace Tiene una estructura Sospechosa");
                            ReportarEnlace(Enlace, 7, "El enlace Tiene una estructura Sospechosa");
                        }
                        // 3. Verificamos si el enlace hace redirecciones a otros enlaces Sospechosos
                        if (TieneRedireccionesSospechosas(Enlace))
                        {
                            razonesReporte.Add("La pagina redirecciona a enlaces sospechosas");
                            ReportarEnlace(Enlace, 7, "La pagina redirecciona a Enlaces sospechosas");
                        }
                        //4. Verificamos si esta incluido en la lista Negra de NordVpn
                        string mensajeMalicioso = VerificarListaNegra(Enlace);
                        if (!string.IsNullOrEmpty(mensajeMalicioso))
                        {
                            razonesReporte.Add(mensajeMalicioso);
                            ReportarEnlace(Enlace, 7, mensajeMalicioso);
                        }

                        // 5. Verificación de Origen del Enlace. Evalúa la reputación del dominio o IP al que pertenece el enlace. Implementación: Revisa la antigüedad del dominio, el país de origen, y la reputación de la IP. Posible acción: Si el dominio es nuevo o tiene mala reputación, Reporta el enlace como "Enlace sospechoso, Navegue con cuidado".

                        // 6. Inspección del Enlace Acortado, Desarrolla o utiliza herramientas para expandir enlaces acortados y verificar su destino final, Implementación: Expande el enlace acortado y realiza todas las demás validaciones sobre el enlace expandido. Posible acción: Si el enlace expandido es sospechoso, reporta el enlace como "Enlace acortado no seguro".

                        // 7. Verificación de Spam

                        if (razonesReporte.Count > 0)
                        {
                            if (objEst.Consultar(sentencia, false))
                            {
                                dr = objEst.Reader;
                                if (dr.Read())
                                {
                                    EsSeguro = Convert.ToBoolean(dr["es_seguro"]);
                                    CantidadConsultas = Convert.ToInt32(dr["cantidad_consultas"]);
                                    CantidadReportes = Convert.ToInt32(dr["cantidad_reportes"]);
                                }
                            }
                            string mensaje = string.Join(", ", razonesReporte);
                            return new ResultadoVerificacion { Success = true, Enlace = Enlace, EsSeguro = false, CantidadConsultas = CantidadConsultas, CantidadReportes = CantidadReportes, Mensaje = mensaje };
                        }
                    }
                    
                    {
                        // 1. verificamos si el enlace tiene certificado ssl
                        var (tieneCertificado, estadoCertificado) = TieneCertificadoSSL(Enlace);
                        if (!tieneCertificado)
                        {
                            razonesReporte.Add($"El enlace no tiene certificado SSL válido: {estadoCertificado}");
                        }
                        //4. Verificamos si esta incluido en la lista Negra de NordVpn
                        string mensajeMalicioso = VerificarListaNegra(Enlace);
                        if (!string.IsNullOrEmpty(mensajeMalicioso))
                        {
                            razonesReporte.Add(mensajeMalicioso);
                        }
                        //5. Da el mensaje si es la estructura 
                        if (TieneEstructuraSospechosa(Enlace))
                        {
                            razonesReporte.Add("El enlace Tiene una estructura Sospechosa");
                        }
                        // 3. Verificamos si el enlace hace redirecciones a otros enlaces Sospechosos
                        if (TieneRedireccionesSospechosas(Enlace))
                        {
                            razonesReporte.Add("La pagina redirecciona a enlaces sospechosas");
                        }
                        string mensaje = string.Join(", ", razonesReporte);

                        var Result = new ResultadoVerificacion { Success = true, Enlace = Enlace, EsSeguro = EsSeguro, CantidadConsultas = CantidadConsultas, CantidadReportes = CantidadReportes, Mensaje = mensaje };
                        return Result;
                    }
                   

                }
                else
                {
                    return new ResultadoVerificacion { Success = false, Mensaje = "No se pudo Verificar el enlace" };
                }
            }
            else
            {
                return new ResultadoVerificacion { Success = false, Mensaje = "error del servidor" };

            }

        }




        //verificar si el enlace existe
        private static bool EnlaceExiste(string url)
        {
            try
            {
                // Asegurarse de que la URL tenga el esquema adecuado
                if (!url.StartsWith("http://") && !url.StartsWith("https://"))
                {
                    url = "https://" + url;
                }
                // Escapar caracteres especiales en la URL
                string escapedUrl = Uri.EscapeUriString(url);

                // Validar la URL
                if (!Uri.TryCreate(escapedUrl, UriKind.Absolute, out Uri uriResult)
                    || (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
                {
                    return (true);
                }

                var request = (HttpWebRequest)WebRequest.Create(uriResult);
                request.Method = "GET";
                request.AllowAutoRedirect = true; 
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    return response.StatusCode == HttpStatusCode.OK;
                }
            }
            catch (WebException ex)
            {
                if (ex.Response is HttpWebResponse httpResponse)
                {
                 
                    if (httpResponse.StatusCode == HttpStatusCode.NotFound ||
                        httpResponse.StatusCode == HttpStatusCode.Forbidden ||
                        httpResponse.StatusCode == HttpStatusCode.MethodNotAllowed)
                    { 
                    return false; 
                    }
                }
               
            }
            return false;
        }

        //Funcion para verificar si la url tiene certificado ssl
        private static (bool tieneCertificado, string estado) TieneCertificadoSSL(string url)
        {
            try
            {
                // Asegurarse de que la URL tenga el esquema adecuado
                if (!url.StartsWith("http://") && !url.StartsWith("https://"))
                {
                    url = "https://" + url;
                }

                // Escapar caracteres especiales en la URL
                string escapedUrl = Uri.EscapeUriString(url);

                // Validar la URL
                if (!Uri.TryCreate(escapedUrl, UriKind.Absolute, out Uri uriResult) ||
                    (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
                {
                    return (true, "URL inválida");
                }

                // Crear la solicitud y verificar el certificado SSL
                var request = (HttpWebRequest)WebRequest.Create(uriResult);
                request.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) =>
                {
                    if (sslPolicyErrors == SslPolicyErrors.None)
                    {
                        return true;
                    }

                    if (certificate is X509Certificate2 cert)
                    {
                        if (cert.NotAfter < DateTime.Now)
                        {
                            throw new Exception("Certificado expirado");
                        }

                        if (cert.NotBefore > DateTime.Now)
                        {
                            throw new Exception("Certificado aún no válido");
                        }
                    }

                    // Manejo de errores en la cadena de certificados
                    if ((sslPolicyErrors & SslPolicyErrors.RemoteCertificateChainErrors) != 0)
                    {
                        foreach (X509ChainStatus status in chain.ChainStatus)
                        {
                            if (status.Status != X509ChainStatusFlags.NoError)
                            {
                                throw new Exception($"Error en la cadena de certificados: {status.StatusInformation}");
                            }
                        }
                    }

                    // Si hay errores de política que no son críticos, permitir la conexión.
                    return (sslPolicyErrors & ~SslPolicyErrors.RemoteCertificateChainErrors) == 0;
                };

                // Enviar la solicitud y obtener la respuesta
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    return (true, "Certificado SSL válido");
                }
            }
            catch (UriFormatException)
            {
                return (true, "URL inválida");
            }
            catch (WebException ex) when (ex.Status == WebExceptionStatus.SecureChannelFailure)
            {
                return (false, "No tiene certificado SSL válido");
            }
            catch (WebException ex)
            {
                return (true, $"Error de conexión: {ex.Message}");
            }
            catch (Exception ex)
            {
                return (true, $"Error: {ex.Message}");
            }
        }

        //para verificar la estructura de la url
        private static bool TieneEstructuraSospechosa(string url)
        {
            // Verificar características sospechosas en la URL
            return url.Contains("@") || // URLs con '@' son a menudo sospechosas
                   url.Contains("://") && !url.Contains("://www.") && !url.Contains("https://") || // No HTTPS o www
                   //url.Contains("%") || // Hay url que tiene estos y seguras, ejemplo un repositorio o un enlace de la api de whatsapp
                   Regex.IsMatch(url, @"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"); // IPs directas en lugar de nombres de dominio
        }

        private static bool TieneRedireccionesSospechosas(string url)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.AllowAutoRedirect = false;
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    if ((int)response.StatusCode >= 300 && (int)response.StatusCode < 400)
                    {
                        string redirectUrl = response.Headers["Location"];
                        if (!string.IsNullOrEmpty(redirectUrl) && TieneEstructuraSospechosa(redirectUrl))
                        {
                            return true; // La redirección es sospechosa
                        }
                    }
                }
            }
            catch
            {
                return false; // No se pudo comprobar o no hay redirección
            }
            return false;
        }

        private static string VerificarListaNegra(string url)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");

                var requestBody = new { url = url };
                var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

                var response = client.PostAsync("https://link-checker.nordvpn.com/v1/public-url-checker/check-url", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = response.Content.ReadAsStringAsync().Result;
                    dynamic result = JsonConvert.DeserializeObject(jsonResponse);

                    int status = result.status;
                    int category = result.category;
              

                    // Verificamos si la URL está reportada como maliciosa
                    if (status == 0)
                    {
                        switch (category)
                        { 
                            case 1:
                                return null;
                            case 2:
                                return "fue identificado como un sitio malicioso. Podría infectar tu dispositivo con virus, gusanos, spyware, troyanos y otros malware.";
                               
                            case 3:
                                return "fue identificado como un sitio de phishing. Podría engañarte para que reveles tu información personal, como tus credenciales de acceso y los datos de tu tarjeta de crédito.";

                            case 7:
                                    return "fue identificado como sospechoso porque es posible que hayas sido redirigido a él por malware o una aplicación potencialmente no deseada.";
                            default:
                                return $"{url} fue categorizado como categoria {category} y estatus {status} pero no se tomó ninguna acción específica.";
                               
                        }
                                       
                    }

                   
                }

               return null;
            }
        }






        private static void ReportarEnlace(string url, int idUsuario, string razonReporte)
        {
            ConexionBD objEst = new ConexionBD();
            string sentencia = $"EXECUTE sp_reportar_enlace '{url}', '{idUsuario}', '{razonReporte}'";

            if (!objEst.EjecutarSentencia(sentencia, false))
            {
                throw new Exception("Error al reportar el enlace: " + sentencia);
            }
        }

    }
}