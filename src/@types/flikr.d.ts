interface FlickrPhoto {
    farm: string;
    id: string;
    secret: string;
    server: string;
    title: string;
}


interface photosInterface {
    photos: {
        photo: FlickrPhoto[];
    };
    stat: string;
}

interface imageInterface {
    photo: {
        farm: string;
        id: string;
        secret: string;
        server: string;
        originalformat: string;
        isfavorite: string;
        dateuploaded: string;
        owner: Owner;
        title: Title;
        description: Description;
        visibility: Visibility;
        dates: Dates;
        views: string;
        comments: Comments;
        tags: Tags;
    };
}

interface Owner {
    nsid: string;
    username: string;
    realname: string;
    location: string;
}

interface Title {
    _content: string;
}

interface Description {
    _content: string;
}

interface Visibility {
    ispublic: string;
    isfriend: string;
    isfamily: string;
}

interface Dates {
    posted: string;
    taken: string;
    takengranularity: string;
    takenunknown: string;
    lastupdate: string;
}

interface Comments {
    _content: string;
}
interface Tags {
    tag: Tag[];
}

interface Tag {
    id: string;
    author: string;
    authorname: string;
    raw: string;
    _content: string;
}
