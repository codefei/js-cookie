module('encoding', lifecycle);

test('Handling quotes in the cookie value for read and write', function () {
	expect(3);

	Cookies.set('quote', '"');
	strictEqual(Cookies.get('quote'), '"', 'should print the quote character');

	Cookies.set('without-last', '"content');
	strictEqual(Cookies.get('without-last'), '"content', 'should print the quote character');

	Cookies.set('without-first', 'content"');
	strictEqual(Cookies.get('without-first'), 'content"', 'should print the quote character');
});

test('RFC 6265 - reading cookie-octet enclosed in DQUOTE', function () {
	expect(1);
	document.cookie = 'c="v"';
	strictEqual(Cookies.get('c'), 'v', 'should decode the quotes');
});

test('RFC 6265 - unallowed characters in cookie value', function () {
	expect(9);

	Cookies.set('whitespace', ' ');
	strictEqual(Cookies.get('whitespace'), ' ', 'should handle the whitespace character');
	strictEqual(document.cookie, 'whitespace=%20', 'whitespace is not allowed, need to encode');
	Cookies.remove('whitespace');

	Cookies.set('comma', ',');
	strictEqual(Cookies.get('comma'), ',', 'should handle the comma character');
	strictEqual(document.cookie, 'comma=%2C', 'comma is not allowed, need to encode');
	Cookies.remove('comma');

	Cookies.set('semicolon', ';');
	strictEqual(Cookies.get('semicolon'), ';', 'should handle the semicolon character');
	strictEqual(document.cookie, 'semicolon=%3B', 'semicolon is not allowed, need to encode');
	Cookies.remove('semicolon');

	Cookies.set('backslash', '\\');
	strictEqual(Cookies.get('backslash'), '\\', 'should handle the backslash character');
	strictEqual(document.cookie, 'backslash=%5C', 'backslash is not allowed, need to encode');
	Cookies.remove('backslash');

	Cookies.set('multiple', '" ,;\\" ,;\\');
	strictEqual(Cookies.get('multiple'), '" ,;\\" ,;\\', 'should handle multiple special characters');
	Cookies.remove('multiple');
});

test('RFC 6265 - sharp is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '#');
	strictEqual(Cookies.get('c'), '#', 'should handle the sharp character');
	strictEqual(document.cookie, 'c=#', 'sharp is allowed, should not encode');
});

test('RFC 6265 - dollar sign is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '$');
	strictEqual(Cookies.get('c'), '$', 'should handle the dollar sign character');
	strictEqual(document.cookie, 'c=$', 'dollar sign is allowed, should not encode');
});

test('RFC 6265 - percent is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '%');
	strictEqual(Cookies.get('c'), '%', 'should handle the percent character');
	strictEqual(document.cookie, 'c=%25', 'percent is allowed, but encode to escape');
});

test('RFC 6265 - ampersand is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '&');
	strictEqual(Cookies.get('c'), '&', 'should handle the ampersand character');
	strictEqual(document.cookie, 'c=&', 'ampersand is allowed, should not encode');
});

// github.com/carhartl/jquery-cookie/pull/62
test('RFC 6265 - plus is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '+');
	strictEqual(Cookies.get('c'), '+', 'should handle the plus character');
	strictEqual(document.cookie, 'c=+', 'plus is allowed, should not encode');
});

test('RFC 6265 - colon is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', ':');
	strictEqual(Cookies.get('c'), ':', 'should handle the colon character');
	strictEqual(document.cookie, 'c=:', 'colon is allowed, should not encode');
});

test('RFC 6265 - less-than is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '<');
	strictEqual(Cookies.get('c'), '<', 'should handle the less-than character');
	strictEqual(document.cookie, 'c=<', 'less-than is allowed, should not encode');
});

test('RFC 6265 - greater-than is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '>');
	strictEqual(Cookies.get('c'), '>', 'should handle the greater-than character');
	strictEqual(document.cookie, 'c=>', 'greater-than is allowed, should not encode');
});

test('RFC 6265 - equal sign is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '=');
	strictEqual(Cookies.get('c'), '=', 'should handle the equal sign character');
	strictEqual(document.cookie, 'c==', 'equal sign is allowed, should not encode');
});

test('RFC 6265 - slash is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '/');
	strictEqual(Cookies.get('c'), '/', 'should handle the slash character');
	strictEqual(document.cookie, 'c=/', 'slash is allowed, should not encode');
});

test('RFC 6265 - question mark is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '?');
	strictEqual(Cookies.get('c'), '?', 'should handle the question mark character');
	strictEqual(document.cookie, 'c=?', 'question mark is allowed, should not encode');
});

test('RFC 6265 - at is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '@');
	strictEqual(Cookies.get('c'), '@', 'should handle the at character');
	strictEqual(document.cookie, 'c=@', 'at is allowed, should not encode');
});

test('RFC 6265 - opening square bracket is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '[');
	strictEqual(Cookies.get('c'), '[', 'should handle the opening square bracket character');
	strictEqual(document.cookie, 'c=[', 'opening square bracket is allowed, should not encode');
});

test('RFC 6265 - closing square bracket is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', ']');
	strictEqual(Cookies.get('c'), ']', 'should handle the closing square bracket character');
	strictEqual(document.cookie, 'c=]', 'closing square bracket is allowed, should not encode');
});

test('RFC 6265 - caret is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '^');
	strictEqual(Cookies.get('c'), '^', 'should handle the caret character');
	strictEqual(document.cookie, 'c=^', 'caret is allowed, should not encode');
});

test('RFC 6265 - grave accent is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '`');
	strictEqual(Cookies.get('c'), '`', 'should handle the grave accent character');
	strictEqual(document.cookie, 'c=`', 'grave accent is allowed, should not encode');
});

test('RFC 6265 - opening curly bracket is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '{');
	strictEqual(Cookies.get('c'), '{', 'should handle the opening curly bracket character');
	strictEqual(document.cookie, 'c={', 'opening curly bracket is allowed, should not encode');
});

test('RFC 6265 - closing curly bracket is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '}');
	strictEqual(Cookies.get('c'), '}', 'should handle the closing curly bracket character');
	strictEqual(document.cookie, 'c=}', 'closing curly bracket is allowed, should not encode');
});

test('RFC 6265 - pipe is allowed in cookie value', function () {
	expect(2);
	Cookies.set('c', '|');
	strictEqual(Cookies.get('c'), '|', 'should handle the pipe character');
	strictEqual(document.cookie, 'c=|', 'pipe is allowed, should not encode');
});

test('RFC 6265 - unallowed characters in cookie-name', function () {
	expect(38);

	Cookies.set('(', 'v');
	strictEqual(Cookies.get('('), 'v', 'should handle the opening parens character');
	strictEqual(document.cookie, '%28=v', 'opening parens is not allowed, need to encode');
	Cookies.remove('(');

	Cookies.set(')', 'v');
	strictEqual(Cookies.get(')'), 'v', 'should handle the closing parens character');
	strictEqual(document.cookie, '%29=v', 'closing parens is not allowed, need to encode');
	Cookies.remove(')');

	Cookies.set('<', 'v');
	strictEqual(Cookies.get('<'), 'v', 'should handle the less-than character');
	strictEqual(document.cookie, '%3C=v', 'less-than is not allowed, need to encode');
	Cookies.remove('<');

	Cookies.set('>', 'v');
	strictEqual(Cookies.get('>'), 'v', 'should handle the greater-than character');
	strictEqual(document.cookie, '%3E=v', 'greater-than is not allowed, need to encode');
	Cookies.remove('>');

	Cookies.set('@', 'v');
	strictEqual(Cookies.get('@'), 'v', 'should handle the at character');
	strictEqual(document.cookie, '%40=v', 'at is not allowed, need to encode');
	Cookies.remove('@');

	Cookies.set(',', 'v');
	strictEqual(Cookies.get(','), 'v', 'should handle the comma character');
	strictEqual(document.cookie, '%2C=v', 'comma is not allowed, need to encode');
	Cookies.remove(',');

	Cookies.set(';', 'v');
	strictEqual(Cookies.get(';'), 'v', 'should handle the semicolon character');
	strictEqual(document.cookie, '%3B=v', 'semicolon is not allowed, need to encode');
	Cookies.remove(';');

	Cookies.set(':', 'v');
	strictEqual(Cookies.get(':'), 'v', 'should handle the colon character');
	strictEqual(document.cookie, '%3A=v', 'colon is not allowed, need to encode');
	Cookies.remove(':');

	Cookies.set('\\', 'v');
	strictEqual(Cookies.get('\\'), 'v', 'should handle the backslash character');
	strictEqual(document.cookie, '%5C=v', 'backslash is not allowed, need to encode');
	Cookies.remove('\\');

	Cookies.set('"', 'v');
	strictEqual(Cookies.get('"'), 'v', 'should handle the double quote character');
	strictEqual(document.cookie, '%22=v', 'double quote is not allowed, need to encode');
	Cookies.remove('"');

	Cookies.set('/', 'v');
	strictEqual(Cookies.get('/'), 'v', 'should handle the slash character');
	strictEqual(document.cookie, '%2F=v', 'slash is not allowed, need to encode');
	Cookies.remove('/');

	Cookies.set('[', 'v');
	strictEqual(Cookies.get('['), 'v', 'should handle the opening square brackets character');
	strictEqual(document.cookie, '%5B=v', 'opening square brackets is not allowed, need to encode');
	Cookies.remove('[');

	Cookies.set(']', 'v');
	strictEqual(Cookies.get(']'), 'v', 'should handle the closing square brackets character');
	strictEqual(document.cookie, '%5D=v', 'closing square brackets is not allowed, need to encode');
	Cookies.remove(']');

	Cookies.set('?', 'v');
	strictEqual(Cookies.get('?'), 'v', 'should handle the question mark character');
	strictEqual(document.cookie, '%3F=v', 'question mark is not allowed, need to encode');
	Cookies.remove('?');

	Cookies.set('=', 'v');
	strictEqual(Cookies.get('='), 'v', 'should handle the equal sign character');
	strictEqual(document.cookie, '%3D=v', 'equal sign is not allowed, need to encode');
	Cookies.remove('=');

	Cookies.set('{', 'v');
	strictEqual(Cookies.get('{'), 'v', 'should handle the opening curly brackets character');
	strictEqual(document.cookie, '%7B=v', 'opening curly brackets is not allowed, need to encode');
	Cookies.remove('{');

	Cookies.set('}', 'v');
	strictEqual(Cookies.get('}'), 'v', 'should handle the closing curly brackets character');
	strictEqual(document.cookie, '%7D=v', 'closing curly brackets is not allowed, need to encode');
	Cookies.remove('}');

	Cookies.set('	', 'v');
	strictEqual(Cookies.get('	'), 'v', 'should handle the horizontal tab character');
	strictEqual(document.cookie, '%09=v', 'horizontal tab is not allowed, need to encode');
	Cookies.remove('	');

	Cookies.set(' ', 'v');
	strictEqual(Cookies.get(' '), 'v', 'should handle whitespace character');
	strictEqual(document.cookie, '%20=v', 'whitespace is not allowed, need to encode');
	Cookies.remove(' ');
});

test('cookie-name - 2 bytes characters', function () {
	expect(2);

	Cookies.set('ã', 'v');
	strictEqual(Cookies.get('ã'), 'v', 'should handle the ã character');
	strictEqual(document.cookie, '%C3%A3=v', 'should encode the ã character');
	Cookies.remove('ã');
});

test('cookie-name - 3 bytes characters', function () {
	expect(2);

	Cookies.set('₯', 'v');
	strictEqual(Cookies.get('₯'), 'v', 'should handle the ₯ character');
	strictEqual(document.cookie, '%E2%82%AF=v', 'should encode the ₯ character');
	Cookies.remove('₯');
});

test('cookie-name - 4 bytes characters', function () {
	expect(2);

	Cookies.set('𩸽', 'v');
	strictEqual(Cookies.get('𩸽'), 'v', 'should_handle the 𩸽 character');
	strictEqual(document.cookie, '%F0%A9%B8%BD=v', 'should encode the 𩸽 character');
	Cookies.remove('𩸽');
});

test('cookie-value - 2 bytes characters', function () {
	expect(2);

	Cookies.set('c', 'ã');
	strictEqual(Cookies.get('c'), 'ã', 'should handle the ã character');
	strictEqual(document.cookie, 'c=%C3%A3', 'should encode the ã character');
	Cookies.remove('c');
});

test('cookie-value - 3 bytes characters', function () {
	expect(2);

	Cookies.set('c', '₯');
	strictEqual(Cookies.get('c'), '₯', 'should handle the ₯ character');
	strictEqual(document.cookie, 'c=%E2%82%AF', 'should encode the ₯ character');
	Cookies.remove('c');
});

test('cookie-value - 4 bytes characters', function () {
	expect(2);

	Cookies.set('c', '𩸽');
	strictEqual(Cookies.get('c'), '𩸽', 'should handle the 𩸽 character');
	strictEqual(document.cookie, 'c=%F0%A9%B8%BD', 'should encode the 𩸽 character');
	Cookies.remove('c');
});
