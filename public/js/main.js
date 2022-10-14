let socket = io.connect();
socket.on('productos',data=>{
    renderProductos(data);
})

socket.on('mensajes',data=>{
    render(data);
})

function renderProductos(data){
    const html = data.map((prod)=>{
        return `<tr class="table-primary">
                    <td>${prod.nombre}</td>
                    <td>${prod.precio}</td>
                    <td><img width="50" src=${prod.foto} alt="not found"></td>
                </tr>`
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}


const agregarProducto = (e)=>{
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio:document.getElementById('precio').value,
        foto:document.getElementById('foto').value
    }
    socket.emit('nuevo-producto',producto);


    document.getElementById('nombre').value = ''
    document.getElementById('nombre').focus()
    document.getElementById('precio').value = ''
    document.getElementById('foto').value = ''
    return false;
}

function render(data){
    const date = new Date();
    const html = data.map((elem)=>{
        return `<div>
                    <strong style="color:blue;">${elem.autor}</strong> <span style="color:brown";>${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span>:
                    <em style="color:green;">${elem.mensaje}</em></div>`
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

const agregarMensaje = (e)=>{
    const mensaje = {
        autor:document.getElementById('email').value,
        mensaje: document.getElementById('texto').value
    }
    socket.emit('nuevo-mensaje',mensaje);

    return false;
}
