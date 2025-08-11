'use client';

import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getPokemonListSummary,
  getPokemonDetail,
  TYPE_KO,
  STAT_KO,
  type PokemonSummary,
  type PokemonDetail,
} from '@/lib/pokeapi-extended';
import Noise from '@/components/noise';
import Image from 'next/image';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 20px;
  color: #111827;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-family: 'Paperlogy-5Medium';
  letter-spacing: -.4px;
`;

const Wrap = styled.div`
  width: 980px;
`;

const Title = styled.div`
  width: 100%;
  margin: 0 0 16px;
  color: #0f172a;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
`;

const Card = styled.li`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  padding: 14px;
  min-height: 110px;
  display: flex;
  gap: 12px;
  align-items: center;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12);
    border-color: rgba(15, 23, 42, 0.16);
  }
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  background: #f3f4f6;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
`;

const Name = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
  color: #0f172a;
`;

const SubName = styled.div`
  font-size: 12px;
  color: #475569;
  opacity: .85;
  text-transform: capitalize;
`;

const Chips = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  background: #f3f4f6;
  border: 1px solid rgba(15, 23, 42, 0.08);
  color: #334155;
`;

const Button = styled.button`
  background: #2563eb;
  color: #fff;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .1s ease, filter .1s ease;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
`;

const ErrorText = styled.p`
  color: #dc2626;
  margin: 8px 0 16px;
`;

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(2, 6, 23, .45);
  display: grid; place-items: center;
  z-index: 50;
`;

const Modal = styled.div`
  width: 760px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 16px;
  padding: 18px;
  overflow: auto;
  box-shadow: 0 18px 48px rgba(2, 6, 23, .2);
  color: #0f172a;
`;

const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  gap: 12px; margin-bottom: 12px; font-size: 1rem; font-weight: 600;
`;

const Close = styled.button`
  background: #eff2f6;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: #0f172a;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
`;

const Section = styled.div`
  margin-top: 14px;
  line-height: 1.6;
  color: #111827;
`;

const NoiseBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`;

export default function PokemonPageLight() {
  const pageSize = 20;

  const [items, setItems] = useState<PokemonSummary[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchPage = useCallback(async (nextOffset: number) => {
    setLoading(true);
    setErr(null);
    try {
      // withKorean = true (기본값이 true지만 명시적으로 씁니다)
      const list = await getPokemonListSummary(nextOffset, pageSize, true);
      setItems(prev => nextOffset === 0 ? list : [...prev, ...list]);
      setOffset(nextOffset + pageSize);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPage(0); }, [fetchPage]);

  const openDetail = async (idOrName: number|string) => {
    setDetailLoading(true);
    try {
      const d = await getPokemonDetail(idOrName, true); // ko name 포함
      setDetail(d);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to load detail');
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <>
      <Container>
        <NoiseBox>
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </NoiseBox>
        <Wrap>
          <Title>
            <Image
              src={'/poke-logo.png'}
              width={260}
              height={100}
              alt='poke-logo'
            />
          </Title>

          {err && <ErrorText>⚠️ {err}</ErrorText>}

          <Grid>
            {items.map(p => (
              <Card key={p.id} onClick={() => openDetail(p.id)}>
                <Thumb src={p.sprite ?? '/placeholder.png'} alt={p.localName ?? p.name} />
                <div>
                  <Name>#{p.id} {p.localName ?? p.name}</Name>
                  {/* 영문명을 보조로 보여주고 싶다면 */}
                  {p.localName && <SubName>{p.name}</SubName>}
                  <Chips>
                    {p.types.map(t => (
                      <Chip key={t}>{TYPE_KO[t] ?? t}</Chip>
                    ))}
                  </Chips>
                </div>
              </Card>
            ))}
          </Grid>

          <Button disabled={loading} onClick={() => fetchPage(offset)}>
            {loading ? 'Loading…' : 'Load more'}
          </Button>
        </Wrap>

        {detail && (
          <Overlay onClick={() => setDetail(null)}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2 style={{ margin: 0 }}>
                  #{detail.id} {detail.localName ?? detail.name}
                </h2>
                <Close onClick={() => setDetail(null)}>닫기</Close>
              </ModalHeader>

              {detailLoading ? (
                <p>Loading detail…</p>
              ) : (
                <>
                  <Section style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    {detail.sprite && (
                      <img
                        src={detail.sprite}
                        alt={detail.localName ?? detail.name}
                        style={{
                          width: 120, height: 120, objectFit: 'contain',
                          background: '#f3f4f6',
                          borderRadius: 12,
                          border: '1px solid rgba(15, 23, 42, 0.1)'
                        }}
                      />
                    )}
                    <div>
                      <Chips>
                        {detail.types.map(t => <Chip key={t}>{TYPE_KO[t] ?? t}</Chip>)}
                      </Chips>
                      <div style={{ opacity: .85, marginTop: 6 }}>
                        {detail.genera && <div>분류: {detail.genera}</div>}
                        <div>키/몸무게: {detail.height} / {detail.weight}</div>
                        {detail.habitat && <div>서식지: {detail.habitat}</div>}
                        {detail.color && <div>색: {detail.color}</div>}
                      </div>
                    </div>
                  </Section>

                  {detail.flavor && (
                    <Section>
                      <strong>도감 설명</strong>
                      <div style={{ opacity: .95, marginTop: 6, whiteSpace: 'pre-wrap' }}>
                        {detail.flavor}
                      </div>
                    </Section>
                  )}

                  {!!detail.abilities.length && (
                    <Section>
                      <strong>특성</strong>
                      <Chips style={{ marginTop: 6 }}>
                        {detail.abilities.map(a => <Chip key={a}>{a}</Chip>)}
                      </Chips>
                    </Section>
                  )}

                  {!!detail.stats.length && (
                    <Section>
                      <strong>기본 스탯</strong>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 6 }}>
                        {detail.stats.map(s => (
                          <div
                            key={s.name}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid rgba(15, 23, 42, 0.1)',
                              borderRadius: 10,
                              padding: '10px 12px',
                            }}
                          >
                            <div style={{ fontSize: 12, opacity: .7, color: '#334155' }}>
                              {STAT_KO[s.name] ?? s.name}
                            </div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{s.base}</div>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}

                  {!!detail.evolution.length && (
                    <Section>
                      <strong>진화 라인</strong>
                      <Chips style={{ marginTop: 6 }}>
                        {detail.evolution.map((n, i) => (
                          <Chip key={`${n}-${i}`} style={{ textTransform: 'capitalize' }}>{n}</Chip>
                        ))}
                      </Chips>
                    </Section>
                  )}
                </>
              )}
            </Modal>
          </Overlay>
        )}
      </Container>
    </>
  );
}
