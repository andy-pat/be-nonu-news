// extract any functions you are using to manipulate your data, into this file

exports.formatTimestamp = (articles) => {

    return articles.map(({ created_at, ...otherProps }) => {

        const formattedArticle = {
            ...otherProps,
            created_at: new Date(created_at)
        }
        return formattedArticle
    })
}


exports.createArticleReference = (articles) => {
    const articleRef = {}
    articleRef[articles.comment_id] = articles.title
    return articleRef;

}



exports.formatCommentData = (comments) => {

    return comments.map(({ created_by, belongs_to, ...otherProps }) => {

        const formattedComment = {
            ...otherProps,
        }

        formattedComment.author = created_by
        delete formattedComment.belongs_to
        formattedComment.belongs_to
        return formattedComment;
    })

}

