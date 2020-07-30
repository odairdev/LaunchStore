const Mask = {
    Apply(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value)
        }, 1);
    },

    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}

const PhotosUpload = {
    input: "",
    uploadLimit: 6,
    preview: document.querySelector('#photos-preview'),
    files: [],

    handleFileInput(event) {
        const { files: fileList } = event.target
        this.input = event.target
        
        if(this.hasLimit(event)) {return}

        Array.from(fileList).forEach(file => {
            this.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = this.getContainer(image)

                this.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        this.input.files = this.getAllfiles()
    },

    hasLimit(event) {
        const { uploadLimit, preview } = PhotosUpload
        const { files: fileList } = event.target

        if( fileList.length > uploadLimit) {
            alert(`Escolha no máximo ${uploadLimit} fotos.`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photos") {
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Atingiu limite de fotos.")
            event.preventDefault()
            return true
        }

        return false
    },

    getAllfiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer //Firefox/Chrome

        this.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    
    getContainer(image) {
        const div = document.createElement('div')

        div.classList.add('photos')
        div.onclick = this.removePhoto

        div.appendChild(image)
        div.appendChild(this.getRemoveButton())

        return div
    },

    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add("material-icons")
        button.innerHTML = "close"

        return button
    },

    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photoArray = Array.from(photoDiv)
        const index = photoArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllfiles()
        photoDiv.remove()
    }
}