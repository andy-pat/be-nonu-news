// extract any functions you are using to manipulate your data, into this file

exports.formatTimestampProperty = (object) => {

    return object.map(({ created_at, ...otherProps }) => {

        const formattedObject = {
            ...otherProps,
            created_at: new Date(created_at).toDateString()
        }
        return formattedObject
    })
}

exports.createArticleReference = (articles) => {
    const referenceObj = {};
    articles.forEach((article) => {
        const keys = Object.keys(article);
        referenceObj[article[keys[1]]] = article[keys[0]];
    });
    return referenceObj;
}

exports.formatCommentData = (comments, referenceObj) => {
    return comments.map(({ created_by, belongs_to, ...otherProps }) => {

        const newComment = {
            created_by,
            belongs_to,
            ...otherProps
        }

        newComment.author = newComment.created_by;
        delete newComment.created_by;
        newComment.article_id = referenceObj[newComment.belongs_to]
        delete newComment.belongs_to

        return newComment;
    })

}


