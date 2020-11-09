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


exports.createArticleRef = (rows) => {
    const referenceObj = {};
    rows.forEach((row) => {
      const keys = Object.keys(row);
      referenceObj[row[keys[1]]] = row[keys[0]];
    });
    return referenceObj;
  }



exports.formatCommentData = (comments, referenceObj) => {
    return comments.map(({ created_by, belongs_to, ...otherProps }) => {

        const formattedComment = {
            ...otherProps,
        }

        formattedComment.author = formattedComment.created_by
        formattedComment.article_id = referenceObj[formattedComment.belongs_to]
        delete formattedComment.belongs_to
        delete formattedComment.created_by
        console.log(formattedComment)

        return formattedComment;
    })

}


