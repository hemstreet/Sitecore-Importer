var assert = require( "assert" );

describe( 'Media', function () {
    describe( 'regex swap', function () {
        it( 'should return values of matched regex', function () {

            var data = "Lorem ipsum dolor sit amet, {{Name Of Image Goes Here}} consectetur adipiscing elit. At quicum ioca seria, ut dicitur, quicum arcana, quicum occulta omnia? Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Duo Reges: constructio interrete. Quamquam haec quidem praeposita recte et reiecta dicere licebit. Nam et complectitur verbis, quod vult, et dicit plane, quod intellegam; Quo modo autem optimum, si bonum praeterea nullum est? Eaedem enim utilitates poterunt eas labefactare atque pervertere. Quibus ego vehementer assentior.",
                pattern = /{{(.*?)}}/i;

            var arr = data.match( pattern );
            var original = arr[ 0 ],
                matched = arr[ 1 ];

            assert.equal( '{{Name Of Image Goes Here}}', original );
            assert.equal( 'Name Of Image Goes Here', matched );

        } );
    } );
} );