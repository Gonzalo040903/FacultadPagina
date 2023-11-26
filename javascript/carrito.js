
    document.addEventListener('DOMContentLoaded', function () {
        const botonesAgregar = document.querySelectorAll('.agregar-carrito');
        const listaCarrito = document.getElementById('lista-carrito');
        const totalCarrito = document.getElementById('total');
        const contadorCarrito = document.getElementById('contador-carrito');
        const btnCarrito = document.getElementById('btn-carrito');
        const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));

        let carrito = [];

        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('eliminar-producto')) {
                const index = parseInt(event.target.getAttribute('data-index'));
                carrito.splice(index, 1);
                mostrarCarrito();
            }
        });

        btnCarrito.addEventListener('click', function () {
            mostrarCarrito();
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.modal') && !event.target.closest('#btn-carrito')) {
                cerrarCarrito();
            }
        });

        function agregarAlCarrito(event) {
            event.preventDefault();
            const nombre = event.target.getAttribute('data-nombre');
            const precio = parseFloat(event.target.getAttribute('data-precio'));

            const item = {
                nombre: nombre,
                precio: precio
            };

            carrito.push(item);
            mostrarCarrito();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Se agrego al carrito!"
              });
        }

        function mostrarCarrito() {
            listaCarrito.innerHTML = '';

            carrito.forEach((item, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                li.innerHTML = `
                    ${item.nombre} - $${item.precio.toFixed(2)}
                    <button class="btn btn-danger eliminar-producto" data-index="${index}">X</button>
                `;
                listaCarrito.appendChild(li);
            });

            actualizarTotal();
            actualizarContador();
            carritoModal.show();
        }

        function cerrarCarrito() {
            carritoModal.hide();
        }

        function actualizarTotal() {
            const total = carrito.reduce((suma, item) => suma + item.precio, 0);
            totalCarrito.textContent = total.toFixed(2);
        }

        function actualizarContador() {
            const cantidad = carrito.length;
            contadorCarrito.textContent = cantidad;
            btnCarrito.classList.remove('btn-primary');
            btnCarrito.classList.add('btn-danger');
            setTimeout(() => {
                btnCarrito.classList.remove('btn-danger');
                btnCarrito.classList.add('btn-primary');
            }, 1000);
        }
    });