var assert = require( "assert" ),
    resizer = require( "../utilities/imageResize.js"),
    script  = require('../script.js');

var dummyContent = "Lorem ipsum dolor sit amet, {{Name Of Image Goes Here}} consectetur adipiscing elit. At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Duo Reges: constructio interrete. Quamquam haec quidem praeposita recte et reiecta dicere licebit. Nam et complectitur verbis, quod vult, et dicit plane, quod intellegam; Quo modo autem optimum, si bonum praeterea nullum est? Eaedem enim utilitates poterunt eas labefactare atque pervertere. Quibus ego vehementer assentior.",
    dummyID      = '{1234-56789-1234-56789}';


describe( 'Setup', function () {
    describe( 'Checker', function () {
        it( 'should return importer script', function () {

            var _script  = require('../script.js')
            assert.equal( typeof script, 'object');

        } );

    } );

} );

describe( 'Media', function () {
    describe( 'regex swap', function () {
        it( 'should return values of matched regex, return orginal and values inside brackets', function () {

            var data = dummyContent,
                pattern = /{{(.*?)}}/i;

            var arr = data.match( pattern );
            var original = arr[ 0 ],
                matched = arr[ 1 ];

            assert.equal( '{{Name Of Image Goes Here}}', original );
            assert.equal( 'Name Of Image Goes Here', matched );

        } );
        it( 'should change curley braces for image tag', function () {

            var data = dummyContent,
                pattern = /{{(.*?)}}/i,
                arr = data.match( pattern );

            var imgTag = '<img title="' + arr[1] + '" src="~/media/' + dummyID + '"/>';

            var replaced = data.replace(arr[0], imgTag ),
                replacedData = 'Lorem ipsum dolor sit amet, <img title="Name Of Image Goes Here" src="~/media/{1234-56789-1234-56789}"/> consectetur adipiscing elit. At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Duo Reges: constructio interrete. Quamquam haec quidem praeposita recte et reiecta dicere licebit. Nam et complectitur verbis, quod vult, et dicit plane, quod intellegam; Quo modo autem optimum, si bonum praeterea nullum est? Eaedem enim utilitates poterunt eas labefactare atque pervertere. Quibus ego vehementer assentior.';

            assert.equal( '<img title="Name Of Image Goes Here" src=\"~/media/{1234-56789-1234-56789}\"/>', imgTag );
            assert.equal( replaced, replacedData);


        } );

    } );

} );

describe( 'Posts', function () {
    describe( 'Read', function () {
        it( 'should read template by id', function () {

        } );

    } );

} );