import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarperfume from "../landingpage/NAVBAR/Navbar";
import Footer from "../landingpage/FOOTER/Footer";

const Usuario = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <Navbarperfume />
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#000", minHeight: "100vh" }}
      >
        <div className="row">
          {/* Sidebar */}
          <aside className="col-md-3 mb-4">
            <div className="list-group">
              <span
                className="list-group-item list-group-item-action active bg-dark border-0"
                style={{ color: "#d4af37" }}
              >
                Información Personal
              </span>
              <span className="list-group-item list-group-item-action bg-dark text-white border-0">
                Historial de Pedido
              </span>
              <span className="list-group-item list-group-item-action bg-dark text-white border-0">
                Métodos de Pago
              </span>
              <span className="list-group-item list-group-item-action bg-dark text-white border-0">
                Lista de Deseos
              </span>
            </div>
            <button
              className="btn btn-outline-light mt-3 w-100"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </aside>

          {/* Main Content */}
          <main className="col-md-9 text-white">
            <h2 className="mb-4" style={{ color: "#d4af37" }}>
              Mi Perfil
            </h2>

            {user ? (
              <>
                {/* Información Personal */}
                <section
                  className="mb-4 p-3 rounded"
                  style={{ backgroundColor: "#111" }}
                >
                  <h4 className="mb-3" style={{ color: "#d4af37" }}>
                    Información Personal
                  </h4>
                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>
                  <p>
                    <strong>Nombre:</strong> {user.nombre}
                  </p>
                  <button className="btn btn-warning">
                    Editar Información
                  </button>
                </section>

                {/* Direcciones (placeholder, porque no existen en el reducer) */}
                <section
                  className="p-3 rounded"
                  style={{ backgroundColor: "#111" }}
                >
                  <h4 className="mb-3" style={{ color: "#d4af37" }}>
                    Direcciones de Envío
                  </h4>
                  <p className="text-muted">
                    No hay direcciones guardadas en este perfil.
                  </p>
                  <button className="btn btn-warning mt-2">
                    Añadir Nueva Dirección
                  </button>
                </section>
              </>
            ) : (
              <div className="p-4 bg-dark rounded text-center">
                <p className="text-white mb-3">
                  No hay usuario logueado. Inicia sesión para ver tu perfil.
                </p>
                <a href="/" className="btn btn-warning">
                  Ir a Login
                </a>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Usuario;