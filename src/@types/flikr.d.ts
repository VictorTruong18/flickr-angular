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
  stat: string;
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

interface commentsInterface {
  comments: {
    comment: Com[];
  };
}

interface Com {
  id: String; //"147221620-50923124242-72157718217686452"
  author: String; //"42193445@N04",
  author_is_deleted: BigInteger; //0,
  authorname: String; //"dirceu1507",
  iconserver: String; //"5553",
  iconfarm: String; //6,
  datecreate: String; //"1612811968",
  permalink: String; //"https:\/\/www.flickr.com\/photos\/lolotorino\/50923124242\/#comment72157718217686452",
  path_alias: String; //"",
  realname: String; //"Dirceu S. Oliveira",
  _content: String; //"Belíssima imagem!"
}

interface sizesInterface {
  sizes: {
    size: Size[];
  };
}

interface Size {
  label: String; //"Square"
  width: BigInteger; // 75
  height: BigInteger; // 75
  source: String; // "https:\/\/live.staticflickr.com\/65535\/51734392674_de6c9fbc6e_s.jpg"
  url: String; // "https:\/\/www.flickr.com\/photos\/bhlubarber\/51734392674\/sizes\/sq\/"
  media: String; // "photo"
}

interface userInterface {
  person: {
    id: String; // "56588665@N00",
    nsid: String;//"56588665@N00",
    ispro: BigInteger;//1,
    is_deleted: BigInteger;//0,
    can_buy_pro: BigInteger;//0,
    iconserver: String;//"7287",
    iconfarm: BigInteger;//8,
    path_alias: String;//"bhlubarber",
    has_stats: BigInteger;//0,
    pro_badge: String;//"legacy",
    expire: BigInteger;//0,
    username: Content;
    realname: Content;
    location:Content;
    // timezone: { "label": "Pacific Time (US & Canada); Tijuana", "offset": "-08:00", "timezone_id": "PST8PDT" }, 
    photosurl: Content; //{ "_content": "https:\/\/www.flickr.com\/photos\/bhlubarber\/" }, 
    description: Content; //{ "_content": "Editorial, Portraiture, Non-Profit, Travel, Fine Art\n\n<div><span class=\"photo_container pc_m bbml_img\"><a data-track=\"thumb\" href=\"\/photos\/bhlubarber\/3194841951\/\" title=\"David Niddrie by Bhlubarber\" ><img class='notsowide' src=\"https:\/\/live.staticflickr.com\/3357\/3194841951_b501fe1c6c_m.jpg\" width=\"178\" height=\"240\" alt=\"David Niddrie by Bhlubarber\"  class=\"pc_img\" border=\"0\" \/><\/a><\/span><\/div>\n\nProfessional photographer currently residing in Vancouver, BC and freelancing for editorial, commercial and fine art outfits. I am a restless soul and am always looking to develop new creative relationships. Currently accepting new assignments and commissions. Please drop me a line! I'd love to meet you.\n\n++++++++\nPortfolio site: <a href=\"http:\/\/davidniddrie.com\" rel=\"noreferrer nofollow\">David Niddrie Photography<\/a>\n\nFind me on <a href=\"https:\/\/www.twitter.com\/davidniddrie\/\" rel=\"noreferrer nofollow\">Twitter<\/a> &amp; <a href=\"https:\/\/www.instagram.com\/davidniddrie\/\" rel=\"noreferrer nofollow\">Instagram<\/a>\n\nFor more on my professional photography career, client list and project details connect with me on <a href=\"https:\/\/www.linkedin.com\/in\/davidniddrie\/\" rel=\"noreferrer nofollow\">Linked In<\/a>\n\n++++++++\n\nShooting with Canon Digital EOS + L lenses, Fujifilm X-series digital, Konica Hexar &amp; Pentax Spotmatic analog and iPhone digital." }, 
    profileurl: Content; //{ "_content": "https:\/\/www.flickr.com\/people\/bhlubarber\/" }, 
    mobileurl: Content; //{ "_content": "https:\/\/m.flickr.com\/photostream.gne?id=483057" }, 
    // photos: Content; //{ "firstdatetaken": { "_content": "1970-01-01 00:00:00" }, "firstdate": { "_content": "1112903116" }, "count": { "_content": "11396" } }, "has_adfree": 0, "has_free_standard_shipping": 0, "has_free_educational_resources": 0 }, "stat": "ok" }
  }
}

interface Content {
  _content: String;
}