export default function(testStr) {
  return {
    test: testStr
      ? testStr.replace(/^assert\(/g, '').replace(/, 'message.*/, '')
      : '',
    message: testStr
      ? testStr.split(/, 'message: /)[1].replace(/'.*$/, '')
      : '',
    status: 'init'
  };
}
