import { Repository, searchRepositories } from "./github-data"

describe('search github repositories data', () => {

  const TOTAL_SAMPLES = 10
  const SAMPLE_VALUE = 'ZZZ'

  const createFakeRepos = (targetCount: number, targetValue: string) => {
    const samples: Array<Repository> = Array.from({ length: TOTAL_SAMPLES }, (_, idx) => ({
      name: SAMPLE_VALUE,
      description: SAMPLE_VALUE,
      owner: { avatar_url: 'www.random.com', login: SAMPLE_VALUE },
      id: idx,
      html_url: SAMPLE_VALUE
    }));

    const targets: Array<Repository> = Array.from({ length: targetCount }, (_, idx) => ({
      name: targetValue,
      description: targetValue,
      owner: { avatar_url: 'www.random.com', login: targetValue },
      id: TOTAL_SAMPLES + idx,
      html_url: targetValue
    }));
    return [...samples, ...targets]
  }

  it('search by `name` field', () => {
    const targetValue = 'NAME'
    const fakeRepos = createFakeRepos(5, targetValue)
    expect(fakeRepos.length).toBe(15);
    const result = searchRepositories(fakeRepos, targetValue, "name")
    expect(result.length).toBe(5)
  })

  it('search by `description` field', () => {
    const targetValue = 'DESCRIPTION'
    const fakeRepos = createFakeRepos(5, targetValue)
    expect(fakeRepos.length).toBe(15);
    const result = searchRepositories(fakeRepos, targetValue, "description")
    expect(result.length).toBe(5)
  })

  it('search by `owner` field', () => {
    const targetValue = 'OWNER'
    const fakeRepos = createFakeRepos(5, targetValue)
    expect(fakeRepos.length).toBe(15);
    const result = searchRepositories(fakeRepos, targetValue, "owner")
    expect(result.length).toBe(5)
  })

  it('skip null value', () => {
    const targetValue = ''
    const fakeRepos = createFakeRepos(5, targetValue)
    expect(fakeRepos.length).toBe(15);
    const result = searchRepositories(fakeRepos, SAMPLE_VALUE, "description")
    expect(result.length).toBe(10)
  })
})