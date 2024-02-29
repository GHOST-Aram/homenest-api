import { GenericDataAccess } from "../../../../z-library/bases/generic-data-access";
import { Gallery, GalleryModel, HydratedGalleryDoc } from "../../data-access/model";
import { postData } from "./raw-data";
import { Paginator } from "../../../../z-library/HTTP/http-response";

export class DataAccess extends GenericDataAccess<GalleryModel, Gallery>{
    constructor(model: GalleryModel){
        super(model)
    }
    public createNew = jest.fn(async(data: Gallery): Promise<HydratedGalleryDoc>=>{
        return new Gallery(data)
    })

    public findByReferenceId =  jest.fn(async(refId: string): Promise<HydratedGalleryDoc| null> =>{
        if(refId === '64c9e4f2df7cc072af2ac9e0')
            return new Gallery(postData)

        return null
    })

    public findWithPagination = jest.fn(async(paginator: Paginator): Promise<HydratedGalleryDoc[]> =>{
        return generateFakeDocs(paginator.limit)
    })

    public findByIdAndUpdate = jest.fn(async(assetId: string, updateDoc: Gallery): Promise<HydratedGalleryDoc | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new Gallery(updateDoc)
        return null
    })

    public findByIdAndDelete = jest.fn(async(assetId: string): Promise<HydratedGalleryDoc | null> =>{
        if(assetId === '64c9e4f2df7cc072af2ac9e4' )
            return new Gallery(postData)
        return null
    })
}

const generateFakeDocs = (limit: number): HydratedGalleryDoc[] =>{
    const docs: HydratedGalleryDoc[] = []

    while(limit > 0){
        docs.push(new Gallery(postData))
        limit --
    }

    return docs
}