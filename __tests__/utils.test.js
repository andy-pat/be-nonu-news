const { formatTimestampProperty, formatCommentData, createArticleReference } = require('../db/utils/data-manipulation')


describe('formatTimestampProperty()', () => {
    test('does not mutate the data given', () => {

        const testArticles = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }]

        formatTimestampProperty(testArticles)

        expect(testArticles).toEqual([{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }])
    });

    test('formats the timestamp property into javascript', () => {
        const testArticles = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 1163852514171
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 1037708514171
        }]

        const expectedOutput = [{
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            author: 'rogersop',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: 'Sat Nov 18 2006'
        },
        {
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: 'Tue Nov 19 2002'
        }]

        expect(formatTimestampProperty(testArticles)).toEqual(expectedOutput)
    })
});

describe('createArticleReference()', () => {
    test('does not mutate the data given', () => {
        const input = [{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]

        createArticleReference(input)
        expect(input).toEqual([{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]);
    });

    test('returns object with article reference', () => {
        const input = [{
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            body: 'some gifs',
            votes: 0,
            topic: 'mitch',
            created_at: '2010-11-17T12:21:54.171Z',
            author: 'icellusedkars'
        },
        {
            article_id: 4,
            title: 'Student SUES Mitch!',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            topic: 'mitch',
            created_at: '2006-11-18T12:21:54.171Z',
            author: 'rogersop'
        }]
        expect(createArticleReference(input)).toEqual({ 'Eight pug gifs that remind me of mitch': 3, 'Student SUES Mitch!': 4 })
    })
})

describe('formatCommentData()', () => {
    test('does not mutate the data given', () => {
        const input1 = [{
            body: 'I am article 1',
            belongs_to: 'article 1',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
        },
        {
            body: 'I am article 2',
            belongs_to: 'article 2',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
        }]

        const input2 = { 'article 1': 1, 'article 2': 2 }

        formatCommentData(input1, input2)

        expect(input1).toEqual([{
            body: 'I am article 1',
            belongs_to: 'article 1',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
        },
        {
            body: 'I am article 2',
            belongs_to: 'article 2',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
        }]);

    });

    test('returns correctly formatted comment data', () => {
        const input1 = [{
            body: 'I am article 1',
            belongs_to: 'article 1',
            created_by: 'tickle122',
            votes: -1,
            created_at: 1468087638932,
        },
        {
            body: 'I am article 2',
            belongs_to: 'article 2',
            created_by: 'grumpy19',
            votes: 7,
            created_at: 1478813209256,
        }]

        const input2 = { 'article 1': 1, 'article 2': 2 }

        const expectedOutput = [{
            "article_id": 1,
            "author": "tickle122",
            "body": "I am article 1",
            "created_at": 1468087638932,
            "votes": -1
        }, {
            "article_id": 2,
            "author": "grumpy19",
            "body": "I am article 2",
            "created_at": 1478813209256,
            "votes": 7
        }]

        expect(formatCommentData(input1, input2)).toEqual(expectedOutput)
    });
});