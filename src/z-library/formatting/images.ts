export const formatImage = (image: {
        name: string,
        data: Buffer,
        contentType: string,
        id?: string
    }) =>{

        return {
            id: image.id,
            name: image.name,
            data: image.data.toString('base64'),
            contentType: image.contentType
    }
    }