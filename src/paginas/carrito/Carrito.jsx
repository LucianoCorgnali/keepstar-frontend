import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../landingpage/FOOTER/Footer";
import Navbarperfume from "../landingpage/NAVBAR/Navbar";

const Carrito = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems || []);

  // Cálculos derivados, protegidos ante inputs raros
  const { subtotal, envio, total } = useMemo(() => {
    const safeNumber = (v) => (Number.isFinite(v) ? v : 0);
    const sub = cartItems.reduce(
      (acc, i) => acc + safeNumber(i.price) * safeNumber(i.qty),
      0
    );
    const shipping = 0; // Gratis por ahora (según referencia)
    return {
      subtotal: sub,
      envio: shipping,
      total: sub + shipping,
    };
  }, [cartItems]);

  // Handlers
  const updateQty = (id, qty) => {
    const next = Math.max(1, Math.min(99, qty)); // límites razonables
    dispatch({ type: "UPDATE_CART_QTY", payload: { id, qty: next } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const proceedToPayment = () => {
    // Placeholder: podrías validar stock, login, etc.
    navigate("/checkout");
  };

  const continueShopping = () => {
    navigate("/productos");
  };

  return (
    <>
    <Navbarperfume></Navbarperfume>
    <div className="container py-4 mt-3" style={{ backgroundColor: "#000" }}>
      <div className="row g-4">
        {/* Listado de items */}
        <div className="col-12 col-lg-8">
          <h2 className="text-white mb-3">Tu Carrito</h2>

          {cartItems.length === 0 ? (
            <div className="p-4 text-center text-white bg-dark rounded">
              <p className="mb-3">Tu carrito está vacío.</p>
              <button className="btn btn-outline-light" onClick={continueShopping}>
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="list-group">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex flex-column flex-md-row align-items-md-center bg-dark border-0 mb-3 rounded"
                  style={{ border: "1px solid rgba(212,175,55,0.25)" }}
                >
                  {/* Imagen */}
                  <div
                    className="d-flex align-items-center justify-content-center p-3"
                    style={{ width: "140px", backgroundColor: "#111", borderRadius: "8px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: "100%", maxHeight: "100px", objectFit: "contain" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Datos */}
                  <div className="flex-grow-1 text-white px-md-3 py-3">
                    <h5 className="mb-1" style={{ color: "#d4af37" }}>{item.name}</h5>
                    {item.brand && <p className="mb-2 text-muted">{item.brand}</p>}

                    <div className="d-flex flex-wrap align-items-center gap-3">
                      {/* Precio unitario */}
                      <div className="text-white">
                        <span className="fw-bold">{item.price}{item.currency}</span>
                        <span className="text-muted ms-2">/ unidad</span>
                      </div>

                      {/* Cantidad */}
                      <div className="d-flex align-items-center">
                        <label className="me-2 text-muted">Cantidad</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="1"
                          max="99"
                          value={item.qty}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10) || 1)}
                          style={{ width: "80px", backgroundColor: "#000", color: "#fff", borderColor: "#444" }}
                        />
                        <div className="btn-group ms-2">
                          <button
                            className="btn btn-sm btn-outline-light"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            disabled={item.qty <= 1}
                            title="Disminuir"
                          >
                            −
                          </button>
                          <button
                            className="btn btn-sm btn-outline-light"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total del ítem */}
                      <div className="ms-md-auto text-white">
                        <span className="text-muted me-2">Total ítem:</span>
                        <strong>
                          {item.price * item.qty}
                          {item.currency}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="p-3 d-flex flex-row flex-md-column gap-2">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              {/* Limpiar carrito */}
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-light" onClick={continueShopping}>
                  Seguir comprando
                </button>
                <button className="btn btn-outline-warning" onClick={clearCart}>
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumen */}
        <div className="col-12 col-lg-4">
          <div
            className="p-3 rounded"
            style={{ background: "linear-gradient(160deg, #0d0d0d, #1a1a1a)", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <h4 className="mb-3" style={{ color: "#d4af37" }}>Resumen de tu pedido</h4>

            <div className="d-flex justify-content-between text-white mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">{subtotal}€</span>
            </div>

            <div className="d-flex justify-content-between text-white mb-2">
              <span className="text-muted">Envío</span>
              <span className="fw-bold">Gratis</span>
            </div>

            <hr style={{ borderColor: "#333" }} />

            <div className="d-flex justify-content-between text-white mb-3">
              <span className="text-muted">Total</span>
              <span className="fw-bold" style={{ color: "#d4af37" }}>{total}€</span>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-warning fw-bold" onClick={proceedToPayment}>
                Proceder al pago
              </button>
              <button className="btn btn-outline-light" onClick={continueShopping}>
                Seguir comprando
              </button>
            </div>

            {/* Nota opcional de políticas/envío */}
            <p className="small text-muted mt-3">
              Los precios incluyen impuestos. El envío gratis aplica sobre compras dentro de Argentina.
            </p>
          </div>
        </div>
      </div>
    </div>
          <Footer></Footer>
    </>
  );
};

export default Carrito;