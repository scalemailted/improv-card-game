"""Standard-library checkpoint ZIP and safe fresh extraction. No installation."""
import hashlib, json, sys, zipfile
from pathlib import Path

source, archive, target = map(lambda p: Path(p).resolve(), sys.argv[1:])
assert source.is_dir() and not archive.exists() and not target.exists()
assert not archive.is_relative_to(source) and not target.is_relative_to(source)
files = sorted(p for p in source.rglob('*') if p.is_file())
assert all(not p.is_symlink() for p in source.rglob('*'))
with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for p in files:
        z.write(p, p.relative_to(source).as_posix())
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert len(z.namelist()) == len(set(z.namelist())) == len(files)
    for name in z.namelist():
        assert (target/name).resolve().is_relative_to(target)
    z.extractall(target)
for p in files:
    assert hashlib.sha256(p.read_bytes()).digest() == hashlib.sha256((target/p.relative_to(source)).read_bytes()).digest()
print(json.dumps({'crc':'passed', 'extractedFileHashes':'passed', 'files':len(files), 'zipSha256':hashlib.sha256(archive.read_bytes()).hexdigest()}))
