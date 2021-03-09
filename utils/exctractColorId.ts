export default function extractColorId(body: any) {
  if (body.color) {
    return body.color;
  } else {
    return undefined;
  }
}
